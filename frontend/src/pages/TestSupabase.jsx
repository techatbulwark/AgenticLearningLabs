import { useState } from 'react';
import { createClient } from "@supabase/supabase-js";

// Debug environment variables
console.log("VITE_SUPABASE_URL from env:", import.meta.env.VITE_SUPABASE_URL);
console.log("VITE_SUPABASE_ANON_KEY from env:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "Key Loaded" : "Key is MISSING or UNDEFINED");
console.log("Key preview:", import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 30) + '...');

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const TestSupabase = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Test 1: Check Basic Connection
  const testConnection = async () => {
    setLoading(true);
    setStatus('Testing Supabase connection...');
    
    if (!supabase) {
      setStatus('❌ Supabase not configured. Check environment variables.');
      setLoading(false);
      return;
    }
    
    try {
      // Try to select from the new test table
      const { data, error } = await supabase
        .from('simple_anon_test')
        .select('*')
        .limit(1);
      
      if (error && error.code === '42501') {
        setStatus('✅ Supabase connected! (RLS blocking SELECT as expected)');
      } else if (error) {
        setStatus(`⚠️ Connection works but error: ${error.message}`);
      } else {
        setStatus('✅ Supabase connected! SELECT works on test table.');
      }
      
      setResponse({ data, error });
    } catch (err) {
      setStatus(`❌ Connection failed: ${err.message}`);
      setResponse({ error: err });
    } finally {
      setLoading(false);
    }
  };

  // Test 2: Simple Insert to New Test Table
  const testSimpleTableInsert = async () => {
    setLoading(true);
    setStatus('Testing insert to simple_anon_test table...');
    
    console.log('Starting simple table test...');
    console.log('Supabase URL:', supabaseUrl);
    console.log('Anon Key exists:', !!supabaseKey);
    
    if (!supabase) {
      setStatus('❌ Supabase not configured');
      setLoading(false);
      return;
    }
    
    // Clear any existing session
    try {
      await supabase.auth.signOut();
      console.log('Cleared session');
    } catch (err) {
      console.log('SignOut error (continuing):', err);
    }
    
    try {
      const testValue = `Test at ${new Date().toISOString()}`;
      console.log('Inserting:', testValue);
      
      const { data, error } = await supabase
        .from('simple_anon_test')
        .insert([{ test_data: testValue }])
        .select();
      
      if (error) {
        setStatus(`❌ Insert failed: ${error.message}`);
        console.error('Insert error details:', error);
      } else {
        setStatus(`✅ Success! Inserted to simple_anon_test: ${JSON.stringify(data)}`);
        console.log('Success:', data);
      }
      
      setResponse({ data, error });
    } catch (err) {
      setStatus(`❌ Exception: ${err.message}`);
      setResponse({ error: err });
    } finally {
      setLoading(false);
    }
  };

  // Test 3: Direct API call to test table
  const testDirectAPI = async () => {
    setLoading(true);
    setStatus('Testing direct API call to simple_anon_test...');
    
    if (!supabaseUrl || !supabaseKey) {
      setStatus('❌ Missing Supabase URL or Key');
      console.error('URL:', supabaseUrl, 'Key exists:', !!supabaseKey);
      setLoading(false);
      return;
    }
    
    const testData = {
      test_data: `Direct API Test at ${new Date().toISOString()}`
    };
    
    try {
      console.log('Sending to:', `${supabaseUrl}/rest/v1/simple_anon_test`);
      
      const response = await fetch(`${supabaseUrl}/rest/v1/simple_anon_test`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(testData)
      });
      
      const text = await response.text();
      
      if (response.ok) {
        setStatus(`✅ Direct API successful! Status: ${response.status}`);
        setResponse({ data: text });
      } else {
        setStatus(`❌ Direct API failed: ${response.status} - ${text}`);
        setResponse({ error: text, status: response.status });
      }
    } catch (err) {
      setStatus(`❌ Direct API error: ${err.message}`);
      setResponse({ error: err });
    } finally {
      setLoading(false);
    }
  };

  // Test 4: Test SQL Role Check
  const testPermissionsCheck = async () => {
    setLoading(true);
    setStatus('Checking table permissions...');
    
    if (!supabase) {
      setStatus('❌ Supabase not configured');
      setLoading(false);
      return;
    }
    
    try {
      // This query won't work from client but shows what we need
      const query = `
        SELECT 
          has_schema_privilege('anon', 'public', 'USAGE') as has_schema,
          has_table_privilege('anon', 'public.simple_anon_test', 'INSERT') as can_insert
      `;
      
      setStatus('⚠️ Permission check requires SQL Editor. Run this query:');
      setResponse({ 
        sql_to_run: query,
        note: 'Both values should be true for anon inserts to work'
      });
    } finally {
      setLoading(false);
    }
  };

  // Test 5: Clear Session
  const testClearSession = async () => {
    setLoading(true);
    setStatus('Clearing any existing sessions...');
    
    if (!supabase) {
      setStatus('❌ Supabase not configured');
      setLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setStatus(`⚠️ SignOut error: ${error.message} (may be normal)`);
      } else {
        setStatus('✅ Session cleared! Ready for anonymous operations.');
      }
      
      // Check current session
      const { data: { session } } = await supabase.auth.getSession();
      setResponse({ session_after_signout: session });
      
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
      setResponse({ error: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test simple_anon_test Table</h1>
        
        {/* Environment Status */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Environment Status</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <span className="font-medium">URL:</span> {' '}
              {supabaseUrl ? 
                <span className="text-green-600">{supabaseUrl}</span> : 
                <span className="text-red-600">❌ Missing</span>
              }
            </div>
            <div>
              <span className="font-medium">Anon Key:</span> {' '}
              {supabaseKey ? 
                <span className="text-green-600">
                  {supabaseKey.substring(0, 20)}... (length: {supabaseKey.length})
                </span> : 
                <span className="text-red-600">❌ Missing</span>
              }
            </div>
            <div>
              <span className="font-medium">Client:</span> {' '}
              {supabase ? 
                <span className="text-green-600">✅ Initialized</span> : 
                <span className="text-red-600">❌ Not initialized</span>
              }
            </div>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={testConnection}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              1. Test Connection
            </button>
            
            <button
              onClick={testClearSession}
              disabled={loading}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400"
            >
              2. Clear Session
            </button>
            
            <button
              onClick={testSimpleTableInsert}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              3. Insert to simple_anon_test
            </button>
            
            <button
              onClick={testDirectAPI}
              disabled={loading}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
            >
              4. Direct API Test
            </button>
            
            <button
              onClick={testPermissionsCheck}
              disabled={loading}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-400"
            >
              5. Show SQL to Check
            </button>
          </div>
        </div>

        {/* Status Display */}
        {status && (
          <div className="bg-white rounded-lg p-6 mb-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <p className="text-lg">{status}</p>
          </div>
        )}

        {/* Response Display */}
        {response && (
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Response</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestSupabase;
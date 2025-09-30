import { useState } from 'react';
import { createClient } from "@supabase/supabase-js";

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

  // Test 1: Check Supabase Connection
  const testConnection = async () => {
    setLoading(true);
    setStatus('Testing Supabase connection...');
    
    if (!supabase) {
      setStatus('❌ Supabase not configured. Check environment variables.');
      setLoading(false);
      return;
    }
    
    try {
      // Try to select from the table (should fail due to RLS but confirms connection)
      const { data, error } = await supabase
        .from('sdf_registrations')
        .select('id')
        .limit(1);
      
      if (error && error.code === '42501') {
        setStatus('✅ Supabase connected! (RLS blocking SELECT as expected)');
      } else if (error) {
        setStatus(`⚠️ Connection works but unexpected error: ${error.message}`);
      } else {
        setStatus('✅ Supabase connected and SELECT works!');
      }
      
      setResponse({ data, error });
    } catch (err) {
      setStatus(`❌ Connection failed: ${err.message}`);
      setResponse({ error: err });
    } finally {
      setLoading(false);
    }
  };

  // Test Anonymous Auth
  const testAnonymousAuth = async () => {
    setLoading(true);
    setStatus('Testing anonymous authentication...');
    
    if (!supabase) {
      setStatus('❌ Supabase not configured');
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signInAnonymously();
      
      if (error) {
        setStatus(`❌ Anonymous auth failed: ${error.message}`);
        setResponse({ error });
      } else {
        setStatus(`✅ Anonymous auth successful! Session: ${data.session ? 'Active' : 'None'}`);
        setResponse({ data });
      }
    } catch (err) {
      setStatus(`❌ Auth error: ${err.message}`);
      setResponse({ error: err });
    } finally {
      setLoading(false);
    }
  };

  // Test 2: Simple Insert
  const testSimpleInsert = async () => {
    setLoading(true);
    setStatus('Testing simple insert...');
    
    if (!supabase) {
      setStatus('❌ Supabase not configured');
      setLoading(false);
      return;
    }
    
    // First ensure anonymous auth
    try {
      await supabase.auth.signInAnonymously();
    } catch (err) {
      console.log('Anonymous auth error:', err);
    }
    
    const testData = {
      first_name: 'Test',
      last_name: `User_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      // Add minimal required fields
      dob: '2000-01-01',
      sin_num: '123456789',
      pref_language: 'english',
      pref_communication: 'email',
      marital_status: 'single',
      street_num: '123',
      street_name: 'Test St',
      city: 'Toronto',
      province: 'ON',
      postal_code: 'M1M1M1',
      primary_phone: 'mobile',
      phone_num: '4165551234',
      labour_force: 'employed',
      source_income: 'employed_with_employer',
      desg_group: '',
      education: '12',
      service_acknowledge: 'true',
      service_participant_name: 'Test User',
      service_participant_date: '2025-01-01',
      ministry_acknowledge: 'true',
      ministry_participant_name: 'Test User',
      ministry_participant_date: '2025-01-01',
      // Empty employment fields
      middle_initial: '',
      emp_type: '',
      emp_name: '',
      job_title: '',
      emp_start_date: '',
      emp_end_date: '',
      emp_country: '',
      pref_wage_method: '',
      wage_amount: '',
      hourly_wage: '',
      paid_hours_week: '',
      reason_leaving: '',
      noc: '',
      naics: '',
      additional_emp_type: '',
      additional_emp_name: '',
      additional_job_title: '',
      additional_emp_start_date: '',
      additional_emp_end_date: '',
      additional_emp_country: '',
      additional_pref_wage_method: '',
      additional_wage_amount: '',
      additional_hourly_wage: '',
      additional_paid_hours_week: '',
      additional_reason_leaving: '',
      emp_currently_employed: '',
      additional_currently_employed: '',
      course_selection: '',
      referral_question: '',
      signature_name: '',
      signature_date: ''
    };
    
    try {
      const { data, error } = await supabase
        .from('sdf_registrations')
        .insert([testData])
        .select();
      
      if (error) {
        setStatus(`❌ Insert failed: ${error.message}`);
        console.error('Insert error details:', error);
      } else {
        setStatus(`✅ Insert successful! ID: ${data?.[0]?.id || 'Unknown'}`);
      }
      
      setResponse({ data, error });
    } catch (err) {
      setStatus(`❌ Insert error: ${err.message}`);
      setResponse({ error: err });
    } finally {
      setLoading(false);
    }
  };

  // Test 3: Minimal Insert (only truly required fields)
  const testMinimalInsert = async () => {
    setLoading(true);
    setStatus('Testing minimal insert...');
    
    if (!supabase) {
      setStatus('❌ Supabase not configured');
      setLoading(false);
      return;
    }
    
    // First ensure anonymous auth
    try {
      await supabase.auth.signInAnonymously();
    } catch (err) {
      console.log('Anonymous auth error:', err);
    }
    
    const minimalData = {
      first_name: 'Minimal',
      last_name: `Test_${Date.now()}`,
      email: `minimal_${Date.now()}@test.com`
    };
    
    try {
      const { data, error } = await supabase
        .from('sdf_registrations')
        .insert([minimalData])
        .select();
      
      if (error) {
        setStatus(`❌ Minimal insert failed: ${error.message}`);
        console.error('Minimal insert error:', error);
      } else {
        setStatus(`✅ Minimal insert successful! ID: ${data?.[0]?.id || 'Unknown'}`);
      }
      
      setResponse({ data, error });
    } catch (err) {
      setStatus(`❌ Minimal insert error: ${err.message}`);
      setResponse({ error: err });
    } finally {
      setLoading(false);
    }
  };

  // Test 4: Direct Fetch API Test
  const testDirectAPI = async () => {
    setLoading(true);
    setStatus('Testing direct API call...');
    
    if (!supabaseUrl || !supabaseKey) {
      setStatus('❌ Missing Supabase URL or Key');
      setLoading(false);
      return;
    }
    
    const testData = {
      first_name: 'Direct',
      last_name: `API_${Date.now()}`,
      email: `direct_${Date.now()}@test.com`
    };
    
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/sdf_registrations`, {
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
        setStatus(`✅ Direct API call successful! Status: ${response.status}`);
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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Supabase Connection Test Page</h1>
        
        {/* Environment Status */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Environment Status</h2>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Supabase URL:</span> {' '}
              {supabaseUrl ? 
                <span className="text-green-600">✅ Configured</span> : 
                <span className="text-red-600">❌ Not configured</span>
              }
            </div>
            <div>
              <span className="font-medium">Supabase Anon Key:</span> {' '}
              {supabaseKey ? 
                <span className="text-green-600">✅ Configured</span> : 
                <span className="text-red-600">❌ Not configured</span>
              }
            </div>
            <div>
              <span className="font-medium">Supabase Client:</span> {' '}
              {supabase ? 
                <span className="text-green-600">✅ Initialized</span> : 
                <span className="text-red-600">❌ Not initialized</span>
              }
            </div>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Connection Tests</h2>
          <div className="space-y-4">
            <div className="space-x-4">
              <button
                onClick={testConnection}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                Test Connection
              </button>
              
              <button
                onClick={testAnonymousAuth}
                disabled={loading}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400"
              >
                Enable Anonymous Auth
              </button>
            </div>
            
            <div className="space-x-4">
              <button
                onClick={testMinimalInsert}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                Test Minimal Insert
              </button>
              
              <button
                onClick={testSimpleInsert}
                disabled={loading}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
              >
                Test Full Insert
              </button>
              
              <button
                onClick={testDirectAPI}
                disabled={loading}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:bg-gray-400"
              >
                Test Direct API
              </button>
            </div>
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
            <h2 className="text-xl font-semibold mb-4">Response Details</h2>
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
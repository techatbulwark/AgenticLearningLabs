import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (same pattern as RegForm.jsx)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

function HealthCheck() {
  const [status, setStatus] = useState('pending');
  const [result, setResult] = useState(null);
  const [allRows, setAllRows] = useState(null);
  const [error, setError] = useState(null);

  const runHealthCheck = async () => {
    setStatus('loading');
    setError(null);
    setResult(null);
    setAllRows(null);

    try {
      console.log('Starting Supabase health check...');
      console.log('Supabase URL:', supabaseUrl);
      console.log('Supabase client initialized:', !!supabase);

      if (!supabase) {
        throw new Error('Supabase client not initialized. Check your .env file for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      }

      // First, query ALL rows from the table to see what's there
      const { data: allData, error: allQueryError } = await supabase
        .from('simple_anon_test')
        .select('*')
        .order('id', { ascending: true });

      if (allQueryError) {
        console.error('Supabase query error:', allQueryError);
        throw allQueryError;
      }

      console.log('All rows query successful:', allData);
      setAllRows(allData);

      const errors = [];
      const results = {};

      // Check 1: Total row count should be 2
      if (allData.length !== 2) {
        errors.push(`Expected 2 total rows, but found ${allData.length}`);
      } else {
        results.totalRows = `✓ Total rows: ${allData.length}`;
      }

      // Check 2: Query for id=6 with test_data="Health Check"
      const row6 = allData.find(row => row.id === 6);
      if (!row6) {
        errors.push('No row found with id=6');
      } else if (row6.test_data !== 'Health Check') {
        errors.push(`Row id=6: Expected test_data="Health Check", but got "${row6.test_data}"`);
      } else {
        results.row6 = `✓ Row id=6 test_data="${row6.test_data}"`;
      }

      // Set status based on results
      if (errors.length > 0) {
        setStatus('warning');
        setError(errors.join('\n'));
        setResult(results);
      } else {
        setStatus('success');
        setResult(results);
      }

    } catch (err) {
      console.error('Health check failed:', err);
      setStatus('error');
      setError(err.message || 'Unknown error');
    }
  };

  // Auto-run on component mount
  useEffect(() => {
    runHealthCheck();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          🔍 Supabase Health Check
        </h1>

        <p className="text-gray-600 mb-4">
          This test verifies the connection to Supabase by querying the <code className="bg-gray-100 px-2 py-1 rounded">simple_anon_test</code> table.
        </p>

        <div className="text-gray-600 mb-6">
          <p className="font-semibold mb-2">Expected results:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Total rows: 2</li>
            <li>Row with id=6 and test_data="Health Check"</li>
          </ul>
        </div>

        <button
          onClick={runHealthCheck}
          disabled={status === 'loading'}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed mb-6"
        >
          {status === 'loading' ? 'Running...' : 'Run Health Check'}
        </button>

        {/* Status Display */}
        {status === 'loading' && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
            <p className="text-blue-800">🔄 Running health check...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
            <p className="text-green-800 font-semibold mb-2">✅ Health Check PASSED!</p>
            {result && (
              <div className="mt-3 bg-white p-3 rounded border border-green-300">
                <p className="font-semibold text-gray-700 mb-2">📊 Validation Results:</p>
                <ul className="text-gray-600 space-y-1">
                  {result.totalRows && <li>{result.totalRows}</li>}
                  {result.row6 && <li>{result.row6}</li>}
                </ul>
              </div>
            )}
          </div>
        )}

        {status === 'warning' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
            <p className="text-yellow-800 font-semibold mb-2">⚠️ Health Check WARNING</p>
            {error && (
              <div className="mt-2 bg-white p-3 rounded border border-yellow-300">
                <p className="font-semibold text-gray-700 mb-2">❌ Failed Checks:</p>
                <ul className="text-yellow-700 space-y-1">
                  {error.split('\n').map((err, idx) => (
                    <li key={idx}>• {err}</li>
                  ))}
                </ul>
              </div>
            )}
            {result && Object.keys(result).length > 0 && (
              <div className="mt-3 bg-white p-3 rounded border border-green-300">
                <p className="font-semibold text-gray-700 mb-2">✅ Passed Checks:</p>
                <ul className="text-green-700 space-y-1">
                  {result.totalRows && <li>{result.totalRows}</li>}
                  {result.row6 && <li>{result.row6}</li>}
                </ul>
              </div>
            )}
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-800 font-semibold mb-2">❌ Health Check FAILED</p>
            {error && (
              <div className="mt-2">
                <p className="text-red-700 font-mono text-sm">{error}</p>
              </div>
            )}
          </div>
        )}

        {/* All Rows Display */}
        {allRows && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-700 font-semibold mb-3">
              📋 All rows in simple_anon_test table ({allRows.length} {allRows.length === 1 ? 'row' : 'rows'}):
            </p>
            {allRows.length === 0 ? (
              <p className="text-sm text-gray-500 italic">Table is empty</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">ID</th>
                      <th className="px-4 py-2 border-b text-left font-semibold text-gray-700">Test Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRows.map((row) => {
                      const isExpected = row.id === 6;
                      const isValid = row.id === 6 && row.test_data === 'Health Check';

                      return (
                        <tr
                          key={row.id}
                          className={isExpected ? 'bg-green-50' : 'hover:bg-gray-50'}
                        >
                          <td className="px-4 py-2 border-b text-gray-800">
                            {row.id}
                            {isExpected && <span className="ml-2 text-green-600 font-semibold">← Expected</span>}
                          </td>
                          <td className="px-4 py-2 border-b text-gray-800">
                            {row.test_data || <span className="text-gray-400 italic">null</span>}
                            {isValid && <span className="ml-2 text-green-600">✓</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 font-semibold mb-2">Debug Information:</p>
          <ul className="text-sm text-gray-600">
            <li>• Supabase URL: {supabaseUrl ? '✅ Set' : '❌ Not set'}</li>
            <li>• Supabase Key: {supabaseKey ? '✅ Set' : '❌ Not set'}</li>
            <li>• Client Initialized: {supabase ? '✅ Yes' : '❌ No'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HealthCheck;

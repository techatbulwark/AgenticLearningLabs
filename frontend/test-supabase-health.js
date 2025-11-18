import supabase from './src/lib/supabase.ts';

/**
 * Supabase Health Check Test
 *
 * Tests connection to Supabase by querying the simple_anon_test table.
 * Expected result: Row with id=3 and test_data="test"
 */
async function testSupabaseConnection() {
  console.log('🔍 Starting Supabase health check...\n');

  try {
    // Query the simple_anon_test table
    const { data, error } = await supabase
      .from('simple_anon_test')
      .select('*')
      .eq('id', 3)
      .single();

    if (error) {
      console.error('❌ Supabase query failed:');
      console.error('Error:', error.message);
      console.error('Details:', error.details);
      console.error('Hint:', error.hint);
      return false;
    }

    // Check if we got the expected result
    if (!data) {
      console.error('❌ No data returned from query');
      return false;
    }

    console.log('✅ Successfully connected to Supabase!');
    console.log('📊 Retrieved data:');
    console.log(`   - ID: ${data.id}`);
    console.log(`   - Test Data: ${data.test_data}`);

    // Validate the expected values
    if (data.id === 3 && data.test_data === 'test') {
      console.log('\n✅ Health check PASSED - Data matches expected values!');
      return true;
    } else {
      console.warn('\n⚠️  Health check WARNING - Data does not match expected values:');
      console.warn(`   Expected: id=3, test_data="test"`);
      console.warn(`   Received: id=${data.id}, test_data="${data.test_data}"`);
      return false;
    }

  } catch (err) {
    console.error('❌ Unexpected error during health check:');
    console.error(err);
    return false;
  }
}

// Run the test
testSupabaseConnection()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((err) => {
    console.error('❌ Fatal error:', err);
    process.exit(1);
  });

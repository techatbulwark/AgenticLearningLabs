const testSimpleTable = async () => {
  console.log('Starting simple table test...');
  
  // Log the environment
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Anon Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
  console.log('Anon Key preview:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...');
  
  if (!supabase) {
    console.error('Supabase client not initialized');
    return;
  }
  
  // Clear any existing session
  await supabase.auth.signOut();
  console.log('Cleared session');
  
  try {
    const testValue = `Test at ${new Date().toISOString()}`;
    console.log('Inserting:', testValue);
    
    const { data, error } = await supabase
      .from('simple_anon_test')
      .insert([{ test_data: testValue }])
      .select();
    
    if (error) {
      console.error('Insert failed:', error);
      alert(`Failed: ${error.message}`);
    } else {
      console.log('Success:', data);
      alert('Success! Check console for details');
    }
  } catch (err) {
    console.error('Exception:', err);
    alert(`Exception: ${err.message}`);
  }
};
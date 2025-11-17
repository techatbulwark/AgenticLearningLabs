import { Link } from 'react-router-dom';

const SDFConfirmation = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-white">
      <div className="max-w-4xl mx-auto my-20 px-10 py-16 bg-card">
        <div className="text-center space-y-6">
          <h1 className="[font-family:'Unageo-SemiBold'] text-4xl text-black text-foreground mb-8">
            Thank You!
          </h1>

          <div className="space-y-4">
            <p className="[font-family:'Unageo'] text-xl text-black text-foreground">
              We have received your submission.
            </p>

            <p className="[font-family:'Unageo'] text-lg text-black text-foreground max-w-2xl mx-auto">
              An email will be sent with your course information approximately one week before the course start date.
            </p>
          </div>

          <div className="pt-8">
            <Link
              to="/"
              className="inline-block bg-black text-white text-lg py-3 px-8 rounded-2xl hover:opacity-85 transition-colors [font-family:'Unageo-SemiBold']"
            >
              Return to Agentic Learning Labs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDFConfirmation;

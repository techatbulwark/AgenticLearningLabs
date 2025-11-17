import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COURSE_OPTIONS = {
  "cohort-6": { courseName: "Sales, Marketing & Business Development", startMonth: "December", startYear: 2025 },
  "cohort-7": { courseName: "Data Analytics & Decision Making", startMonth: "December", startYear: 2025 },
  "cohort-8": { courseName: "Data Analytics & Decision Making", startMonth: "December", startYear: 2025 },
  "cohort-9": { courseName: "Data Analytics & Decision Making", startMonth: "January", startYear: 2026 },
  "cohort-10": { courseName: "Sales, Marketing & Business Development", startMonth: "January", startYear: 2026 },
  "cohort-11": { courseName: "Customer Experience & Product Innovation", startMonth: "January", startYear: 2026 },
};

const SelectCourse = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleContinue = () => {
    if (!selectedCourse) {
      alert('Please select a course to continue.');
      return;
    }
    navigate(`/sdf/${selectedCourse}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-white">
      <div className="max-w-5xl mx-auto my-20 px-10 py-16 bg-white rounded-lg shadow-xl">
        <h2 className="[font-family:'Unageo-SemiBold'] text-3xl mb-8 text-left text-gray-700">
          Thank you. One more step.
        </h2>

        {/* Course Selection */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="[font-family:'Unageo-SemiBold'] text-xl mb-4 text-gray-700">
            Please select your course:
          </h3>
          <div className="space-y-3">
            {Object.entries(COURSE_OPTIONS).map(([value, { courseName, startMonth, startYear }]) => (
              <div key={value} className="flex items-center">
                <input
                  type="radio"
                  id={value}
                  name="course"
                  value={value}
                  checked={selectedCourse === value}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="accent-green-600 w-5 h-5 mr-3"
                  required
                />
                <label htmlFor={value} className="[font-family:'Unageo'] text-lg text-gray-700 cursor-pointer">
                  {courseName} - {startMonth} {startYear}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 text-gray-700 mb-6 text-left [font-family:'Unageo']">
          <p>
            This program is offered thanks to generous funding from the Ontario Government's Skills Development Fund (SDF).
          </p>

          <p>
            To secure your spot, we require all participants to complete the SDF form on the next page.
          </p>

          <p>
            This is to ensure their funding supports Ontarians towards meaningful jobs and requires some personal information including your social insurance number (SIN). Please rest assured that protecting your privacy and data security is a top priority.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Your information is kept strictly confidential and transmitted through a secure, encrypted system.</li>
            <li>Your SIN is only used by Ontario Government to verify your participation in the course and it enables you to complete the course at no cost.</li>
          </ul>

          <p>
            We're excited to have you join us in building new AI skills, and if you have any questions about the course – or the form – please reach out at{' '}
            <a href="mailto:program@agenticlearninglabs.com" className="text-blue-600 hover:underline">
              program@agenticlearninglabs.com
            </a>
            . We are here to help!
          </p>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-300 text-gray-700 px-8 py-3 rounded-2xl hover:bg-gray-400 transition-colors text-lg [font-family:'Unageo-SemiBold']"
          >
            Exit
          </button>
          <button
            onClick={handleContinue}
            className="bg-green-600 text-white px-8 py-3 rounded-2xl hover:bg-green-700 transition-colors text-lg [font-family:'Unageo-SemiBold']"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectCourse;

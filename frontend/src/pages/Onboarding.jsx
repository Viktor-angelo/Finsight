import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Result from "../components/Result";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();

 
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("formData");
      return saved
        ? JSON.parse(saved)
        : {
            name: "",
            email: "",
            monthly: "",
            extra: "",
            rent: "",
            food: "",
          };
    } catch {
      return {
        name: "",
        email: "",
        monthly: "",
        extra: "",
        rent: "",
        food: "",
      };
    }
  });

 

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  function nextStep(newStep) {
    if (newStep === 5) {
      navigate("/dashboard");
    } else {
      setStep(newStep);
    }
  }

  function resetOnboarding() {
    setFormData({
      name: "",
      email: "",
      monthly: "",
      extra: "",
      rent: "",
      food: "",
    });

    setStep(1);
  }

  return (
    <div>
      {step === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          next={() => nextStep(2)}
        />
      )}

      {step === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          next={() => nextStep(3)}
        />
      )}

      {step === 3 && (
        <Step3
          formData={formData}
          setFormData={setFormData}
          next={() => nextStep(4)} 
        />
      )}

      {step === 4 && (
        <Result
          formData={formData}
          next={() => nextStep(5)}
          reset={resetOnboarding} 
        />
      )}
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Disclaimer"
};

export default function MedicalDisclaimerPage() {
  return (
    <article className="prose prose-emerald max-w-3xl">
      <h1>Medical Disclaimer</h1>
      <p>
        The information provided by Best Life Official is for educational purposes only and should not be used to diagnose
        or treat any medical condition. Always consult with your doctor before making significant changes to your diet,
        exercise, or supplement routine.
      </p>
      <p>
        If you are pregnant, breastfeeding, have chronic health conditions, or take prescription medications, seek tailored
        advice from a qualified healthcare provider.
      </p>
    </article>
  );
}

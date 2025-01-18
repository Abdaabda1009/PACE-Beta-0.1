import { FeedbackForm } from "@/components/feedback/FeedbackForm";


export const Support = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold text-white">Support</h1>
      <p className="text-gray-499 mb-8">
        We value your feedback. PLease use the form below to share your thoughts
        about specific features.
      </p>
      <FeedbackForm />
    </div>
  );
}
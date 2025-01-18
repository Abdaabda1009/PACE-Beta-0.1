import { FeedbackForm } from "@/components/feedback/FeedbackForm";


export const Support = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2x1 font-semibold"></h1>
      <p className="text-gray-499 mb-8">

        We value your feedback. PLease use the form below to share your thoughts about specific features.
      </p>
      <FeedbackForm />
    </div>
  )
}
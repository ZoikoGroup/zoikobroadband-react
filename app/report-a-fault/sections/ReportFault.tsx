"use client";
import FaultTrackingModal from "@/app/Components/FaultTrackingModal";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ReportFault() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    issueType: "",
    isBusinessCustomer: false,
    testType: "",
    fullName: "",
    email: "",
    phone: "",
    accountNumber: "",
    address: "",
    district: "",
    propertyType: "",
    problemDescription: "",
    relatedIssues: [] as string[],
    additionalNotes: "",
    preferredContact: "",
    surveyNeeded: "not_required",
    priority: "standard",
    confirmAccuracy: false,
    confirmContact: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  const handleStepOne = () => {

    if (!formData.issueType) {

      setErrors({
        issueType:
          "Please select a fault type.",
      });

      return;
    }

    setErrors({});

    setStep(2);
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    const fieldValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear the error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleIssueToggle = (issue: string) => {
    setFormData((prev) => ({
      ...prev,
      relatedIssues: prev.relatedIssues.includes(issue)
        ? prev.relatedIssues.filter((i) => i !== issue)
        : [...prev.relatedIssues, issue],
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^(\+44|0)[0-9]{9,14}$|^(\+91)?[6-9]\d{9}$/;

    if (!formData.issueType)
      newErrors.issueType = "Please select a fault type.";

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address.";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number can contain only digits.";
    } else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Enter a valid phone number.";

    if (!formData.address.trim())
      newErrors.address = "Address is required.";

    if (!formData.district.trim())
      newErrors.district = "District is required.";

    if (!formData.propertyType)
      newErrors.propertyType = "Please select a property type.";

    if (!formData.problemDescription.trim())
      newErrors.problemDescription =
        "Please describe your problem.";

    else if (formData.problemDescription.trim().length < 15)
      newErrors.problemDescription =
        "Description should be at least 15 characters.";

    if (!formData.preferredContact)
      newErrors.preferredContact =
        "Please select a preferred contact method.";

    if (!formData.confirmAccuracy)
      newErrors.confirmAccuracy =
        "Please confirm the information is accurate.";

    if (!formData.confirmContact)
      newErrors.confirmContact =
        "Please confirm your contact details.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {

      toast.error(
        "Please login first , to report a fault."
      );

      return;
    }

    if (!formData.confirmAccuracy || !formData.confirmContact) {
      toast.error("Please accept both confirmations before submitting.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/faults/report/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            issue_type: formData.issueType,
            is_business_customer: formData.isBusinessCustomer,

            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            account_number: formData.accountNumber,

            address: formData.address,
            district: formData.district,
            property_type: formData.propertyType,

            problem_description: formData.problemDescription,
            related_issues: formData.relatedIssues,

            additional_notes: formData.additionalNotes,

            preferred_contact: formData.preferredContact,
            survey_needed: formData.surveyNeeded,

            priority: formData.priority,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        toast.error("Something went wrong.");
        return;
      }

      console.log(data);

      toast.success(
        `Fault submitted successfully!\nReference Number: ${data.data.reference_number}`
      );

      // reset later
      setFormData({
        issueType: "",
        isBusinessCustomer: false,
        testType: "",
        fullName: "",
        email: "",
        phone: "",
        accountNumber: "",
        address: "",
        district: "",
        propertyType: "",
        problemDescription: "",
        relatedIssues: [],
        additionalNotes: "",
        preferredContact: "",
        surveyNeeded: "not_required",
        priority: "standard",
        confirmAccuracy: false,
        confirmContact: false,
      });

      setStep(1);

    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };
  const problems = ["No Internet", "Slow Broadband", "Router Not Working", "Wi-Fi Dropping", "Faulty Socket", "Other"];
  const tools = ["Speed Test", "Line Check", "Wi-Fi Signal Check", "Device Check" ,"None"];


  return (
    <>

      <section className="bg-[#f0f2f4] dark:bg-gray-900 px-4 py-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 id="report-a-fault" className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white">
              Report Your Fault
            </h2>
            {/* <button className="text-sm border px-4 py-2 rounded-md dark:text-white">
            Track My Faults
          </button> */}
            <button
              onClick={() => setShowTrackingModal(true)}
              className="text-sm md:text-base border px-4 py-2 rounded-md dark:text-white"
            >
              Track My Faults
            </button>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">

            {/* ── STEP 1 ────────────────────────────────────────────────── */}
            {step === 1 && (
              <>
                <h3 className="font-semibold text-[#10446C] dark:text-white mb-6">
                  Step 1/3: Choose the Problem Type
                </h3>
                <div className="bg-[#f8f9fa] dark:bg-gray-900 p-6 rounded-xl">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {problems.map((item) => (
                      <button
                        key={item}
                        onClick={() => setFormData((prev) => ({ ...prev, issueType: item }))}
                        className={`flex flex-col items-center justify-center gap-2 border-2 rounded-lg p-5 text-sm font-medium transition-all duration-200
                        ${formData.issueType === item
                            ? "border-[#10446C] bg-blue-100 dark:border-blue-400 dark:bg-gray-800 dark:text-white"
                            : "border-gray-300 dark:border-gray-700 dark:text-gray-400 dark:hover:border-white dark:hover:text-white"
                          }`}
                      >
                        <div className="text-xl">📶</div>
                        <span className="text-center dark:text-white">{item}</span>
                      </button>
                    ))}
                  </div>
                  {
                    errors.issueType && (
                      <p className="text-red-500 text-sm mt-3">
                        {errors.issueType}
                      </p>
                    )
                  }

                  <select
                    name="isBusinessCustomer"
                    value={formData.isBusinessCustomer ? "Yes" : "No"}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, isBusinessCustomer: e.target.value === "Yes" }))
                    }
                    className="w-full mt-4 border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800 dark:text-white"
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>

                  <button
                    onClick={handleStepOne}
                    className="mt-6 w-full sm:w-auto bg-[#10446C] hover:bg-[#0a2e4a] dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-8 py-2 rounded-md transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              </>
            )}

            {/* ── STEP 2 ────────────────────────────────────────────────── */}
            {step === 2 && (
              <>
                <h3 className="font-semibold text-[#10446C] dark:text-white mb-4">
                  Step 2/3: Select Diagnostics (Optional)
                </h3>

                <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-sm mb-6">
                  Tip: Most broadband issues are resolved by restarting your router.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tools.map((tool) => (
                    <button
                      key={tool}
                      onClick={() => setFormData((prev) => ({ ...prev, testType: tool }))}
                      className={`bg-[#f8f9fa] dark:bg-gray-700 border-2 dark:border-gray-600 rounded-lg p-4 text-center
                        ${formData.testType === tool
                            ? "border-[#10446C] bg-blue-100 dark:border-blue-400 dark:bg-gray-800 dark:text-white"
                            : "border-gray-300 dark:border-gray-700 dark:text-gray-400 dark:hover:border-white dark:hover:text-white"
                          }`}
                    >
                      <div className="text-xl mb-2">⚙️</div>
                      <p className="font-semibold text-[#10446C] dark:text-white">{tool}</p>
                      {/* <button className="mt-3 bg-[#10446C] text-white px-4 py-2 rounded-md text-sm">
                        Run Test
                      </button> */}
                    </button>
                  ))}
                </div>

                {/* <div className="mt-6 bg-[#f8f9fa] dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Diagnostic Summary</p>
                  <div className="h-1 bg-[#F6C140] mt-2 rounded"></div>
                </div> */}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="border px-4 py-2 rounded-md dark:text-white"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-[#10446C] text-white px-4 py-2 rounded-md"
                  >
                    {formData.testType ? "Next Step" : "Skip Diagnostics"}
                    {/* Skip Diagnostics */}
                  </button>
                </div>
              </>
            )}

            {/* ── STEP 3 ────────────────────────────────────────────────── */}
            {step === 3 && (
              <div>
                <h3 className="font-semibold text-[#10446C] dark:text-white mb-6">
                  Step 3/3: Submit Your Report
                </h3>

                {/* Contact Information */}
                <div className="border-l-4 border-[#F6C140] pl-4 mb-6">
                  <h4 className="text-base md:text-lg font-semibold text-[#10446C] mb-3">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Full Name</label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`border rounded-md p-2 text-sm w-full
                        ${errors.fullName
                            ? "border-red-500"
                            : "border-gray-300"
                          }`}
                      />
                      {
                        errors.fullName && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.fullName}
                          </p>
                        )
                      }
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Email Address</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="yourname@example.com"
                        className={`border rounded-md p-2 text-sm w-full
                        ${errors.email
                            ? "border-red-500"
                            : "border-gray-300"
                          }`}
                      />
                      {
                        errors.email && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.email}
                          </p>
                        )
                      }
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Phone Number</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        type="tel"
                        placeholder="Enter your phone number"
                        className={`border rounded-md p-2 text-sm w-full
                        ${errors.phone
                            ? "border-red-500"
                            : "border-gray-300"
                          }`}
                      />
                      {
                        errors.phone && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.phone}
                          </p>
                        )
                      }
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Account Number (Optional)</label>
                      <input
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="0000-000-000"
                        className={`border rounded-md p-2 text-sm w-full
                        ${errors.accountNumber
                            ? "border-red-500"
                            : "border-gray-300"
                          }`}
                      />
                      {
                        errors.accountNumber && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.accountNumber}
                          </p>
                        )
                      }
                    </div>
                  </div>
                </div>

                {/* Service Address */}
                <div className="border-l-4 border-[#F6C140] pl-4 mb-6">
                  <h4 className="text-base md:text-lg font-semibold text-[#10446C] mb-3">
                    Service Address
                  </h4>
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Address</label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter the address where the fault exists"
                      className={`border rounded-md p-2 text-sm w-full
                      ${errors.address
                          ? "border-red-500"
                          : "border-gray-300"
                        }`}
                    />
                    {
                      errors.address && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.address}
                        </p>
                      )
                    }
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">District</label>
                      <input
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="District"
                        className={`border rounded-md p-2 text-sm w-full
                        ${errors.district
                            ? "border-red-500"
                            : "border-gray-300"
                          }`}
                      />
                      {
                        errors.district && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.district}
                          </p>
                        )
                      }
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Property Type</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className={`border rounded-md p-2 text-sm w-full
                        ${errors.propertyType
                            ? "border-red-500"
                            : "border-gray-300"
                          }`}
                      >
                        <option value="">Select a Property Type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrial">Industrial</option>
                        <option value="public-building">Public Building</option>
                        <option value="other">Other</option>
                      </select>
                      {
                        errors.propertyType && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.propertyType}
                          </p>
                        )
                      }
                    </div>
                  </div>
                </div>

                {/* Problem Details */}
                <div className="border-l-4 border-[#F6C140] pl-4 mb-6">
                  <h4 className="text-base md:text-lg font-semibold text-[#10446C] mb-1">
                    Problem Details
                  </h4>
                  <p className="text-xs text-gray-500 mb-3">
                    Describe the issue in as much detail as possible.
                  </p>
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Describe the Problem</label>
                    <textarea
                      name="problemDescription"
                      value={formData.problemDescription}
                      onChange={handleInputChange}
                      placeholder="Describe what you have noticed..."
                      rows={4}
                      className={`border rounded-md p-2 text-sm w-full resize-none
                      ${errors.problemDescription
                          ? "border-red-500"
                          : "border-gray-300"
                        }`}
                    />
                    {
                      errors.problemDescription && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.problemDescription}
                        </p>
                      )
                    }
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">Relate to an Issue</label>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {["All Areas", "Coupled Spray", "Distribution", "Safety", "Standpipe", "Drinking Meter"].map(
                        (issue) => (
                          <label key={issue} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.relatedIssues.includes(issue)}
                              onChange={() => handleIssueToggle(issue)}
                              className="accent-[#10446C] w-4 h-4"
                            />
                            {issue}
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="border-l-4 border-[#F6C140] pl-4 mb-6">
                  <h4 className="text-base md:text-lg font-semibold text-[#10446C] mb-3">
                    Additional Information
                  </h4>
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-1">Additional Notes (Optional)</label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      placeholder="Any other information..."
                      rows={3}
                      className={`border rounded-md p-2 text-sm w-full resize-none
                      ${errors.additionalNotes
                          ? "border-red-500"
                          : "border-gray-300"
                        }`}
                    />
                    {errors.additionalNotes && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.additionalNotes}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Preferred Contact Method</label>
                      {/* ✅ Bug 3 fixed: name now matches formData key */}
                      <select
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleInputChange}
                        className={`border rounded-md p-2 text-sm w-full
                        ${errors.preferredContact
                            ? "border-red-500"
                            : "border-gray-300"
                          }`}
                      >
                        <option value="">Select Contact Method</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="post">Post</option>
                      </select>
                      {errors.preferredContact && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.preferredContact}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Survey Needed</label>
                      <select
                        name="surveyNeeded"
                        value={formData.surveyNeeded}
                        onChange={handleInputChange}
                        className={`border rounded-md p-2 text-sm w-full
                        ${errors.surveyNeeded
                            ? "border-red-500"
                            : "border-gray-300"
                          }`}
                      >
                        <option value="">Select Option</option>
                        <option value="required">Required</option>
                        <option value="not_required">Not Required</option>
                      </select>
                      {errors.surveyNeeded && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.surveyNeeded}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Priority — Bug 1 fixed: now a proper sibling section, not nested */}
                <div className="border-l-4 border-[#F6C140] pl-4 mb-6">
                  <h4 className="text-base md:text-lg font-semibold text-[#10446C] mb-3">
                    Priority & Special Requirements
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      onClick={() => setFormData((prev) => ({ ...prev, priority: "standard" }))}
                      className={`border-2 rounded-md p-4 cursor-pointer transition-all ${formData.priority === "standard" ? "border-[#10446C] bg-blue-50" : "border-gray-200"
                        }`}
                    >
                      <p className="font-semibold text-[#10446C] text-sm">Standard</p>
                      <p className="text-xs text-gray-500 mt-1">Normal priority — resolved within standard SLA</p>
                    </div>
                    <div
                      onClick={() => setFormData((prev) => ({ ...prev, priority: "urgent" }))}
                      className={`border-2 rounded-md p-4 cursor-pointer transition-all ${formData.priority === "urgent" ? "border-red-500 bg-red-50" : "border-gray-200"
                        }`}
                    >
                      <p className="font-semibold text-red-600 text-sm">Urgent</p>
                      <p className="text-xs text-gray-500 mt-1">High priority — escalated for faster resolution</p>
                    </div>
                  </div>
                </div>

                {/* Declarations — Bug 1 fixed: now correctly outside Priority div */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 border border-gray-200 mb-6 flex flex-col gap-3">
                  <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="confirmContact"
                      checked={formData.confirmContact}
                      onChange={handleInputChange}
                      className="mt-0.5 accent-[#10446C] w-4 h-4"
                    />
                    <span>
                      I confirm this Fault Report is accurate to the best of my knowledge and I am aware of the{" "}
                      <a href="/privacy-notice" className="text-[#10446C] underline">Privacy Policy</a>.
                    </span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="confirmAccuracy"
                      checked={formData.confirmAccuracy}
                      onChange={handleInputChange}
                      className="mt-0.5 accent-[#10446C] w-4 h-4"
                    />
                    <span>
                      I confirm the contact details above are correct and I can be contacted about this report if required.
                    </span>
                  </label>
                </div>

                {/* Buttons — Bug 2 fixed: now correctly inside step 3 div, outside all sections */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="border border-gray-300 px-5 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-[#10446C] text-white px-5 py-2 rounded-md text-sm hover:bg-[#0d3a5e] transition disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit Fault Report"}
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      </section>
      {/* Fault Tracking Modal */}
      <FaultTrackingModal
        open={showTrackingModal}
        onClose={() => setShowTrackingModal(false)}
      />
    </>
  );

}


import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="space-y-4 text-gray-800 leading-relaxed">
      <h3 className="font-semibold text-lg">Terms & Conditions</h3>
      <p>
        By submitting this form, you agree to provide accurate and truthful information for the purpose of matchmaking.
        A clear, full-length of your recent photo / picture of yourself (head to toe) is required as part of the application.
      </p>

      <p>
        Submissions without all this requirement may result to your application not to be considered.
        All these will be used solely for matchmaking purposes and will not be shared publicly without your consent.
      </p>

      <h3 className="font-semibold text-lg mt-6">Matchmaking Service Disclaimer & Terms</h3>
      <p>
        Thank you for your interest in my matchmaking service. My goal is to connect you with a potential match
        based on the preferences and details you provide. However, please understand that matchmaking is a process,
        not a guarantee. While I will make every effort to find a suitable match for you, success ultimately depends
        on various factors, including compatibility, personal effort, and timing.
      </p>

      <p>By signing up for this service, you acknowledge and agree to the following:</p>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          <strong>No Guaranteed Matches –</strong> While I carefully consider your preferences and search for compatible
          individuals, I cannot guarantee that a match will be found or that any match will result in a successful relationship.
        </li>
        <li>
          <strong>Non-Refundable Payment –</strong> The matchmaking fee covers the time, effort, and resources dedicated
          to reviewing your application, searching for a suitable match, and facilitating introductions. Regardless of
          the outcome, all payments are final and non-refundable.
        </li>
        <li>
          <strong>Client Responsibility –</strong> Once a match is introduced, it is your responsibility to engage,
          communicate, and determine compatibility. I am not responsible for the actions, behavior, or decisions of
          any match you are introduced to.
        </li>
        <li>
          <strong>Privacy & Confidentiality –</strong> Your information will be handled with care and discretion;
          however, I am not liable for any outcomes resulting from the exchange of contact details between matches.
        </li>
        <li>
          <strong>Honest & Accurate Information –</strong> You must provide truthful and up-to-date information about
          yourself. Any misrepresentation can affect the quality of your matches and may result in termination of services
          without a refund. In addition, users must provide accurate and truthful information about their relationship
          status, background, and intentions. Misrepresentation may result in removal from the platform.
        </li>
      </ul>

      <h3 className="font-semibold text-lg mt-6">Match Guarantee</h3>
      <p>
        While we strive to provide thoughtful and compatible matches, we do not guarantee a specific number of matches,
        romantic outcomes, or success in forming a long-term relationship.
      </p>

      <h3 className="font-semibold text-lg mt-6">Refund Policy</h3>
      <p>
        All payments are final. We do not offer refunds once services have commenced, regardless of the outcome
        or client’s participation level.
      </p>

      <h3 className="font-semibold text-lg mt-6">Matchmaking Duration and Renewal Policy</h3>
      <p>
        The matchmaking service is a six months package. Once the six months laps (match attempts), a “lap” is defined
        as a completed introduction or effort made to match you with a compatible individual.
      </p>
      <p>
        If, after six months laps, a suitable match is not found or a successful connection is not established,
        the service will be considered complete. Clients wishing to continue must renew their package to receive
        additional match attempts. No additional matches will be made beyond the initial six months laps without renewal.
      </p>

      <p>
        By submitting this form and making a payment, you confirm that you understand and accept these terms.
      </p>

      <p>
        If you’re ready to begin, please complete the form with as much detail as possible to improve your chances
        of finding a compatible match.
      </p>

      <p className="font-medium mt-6 text-center">📩 Fill out the matchmaking form to get started!</p>
    </div>
  );
}

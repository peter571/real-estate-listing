import React, { useRef } from "react";
import { Button, Modal, TextInput, Label, Textarea } from "flowbite-react";

export default function EmailAgentModal({
  data,
  setShowEmailAgentModal,
}: EmailAgentModalProp) {
  const fullNamesRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (fullNamesRef && emailRef && messageRef) {
      const userMessage = {
        full_names: fullNamesRef.current?.value,
        phone_number: phoneRef.current?.value,
        email: emailRef.current?.value,
        message: messageRef.current?.value,
      };
      console.log(userMessage);
    }
  }

  return (
    <React.Fragment>
      <Modal
        show={data.show}
        size="lg"
        popup={true}
        onClose={() => {
          setShowEmailAgentModal({ realtor_id: null, show: false });
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-4 lg:px-4 xl:pb-4">
            <h3 className="text-xl text-gray-900 dark:text-white font-semibold">
              Find out more about this property.
            </h3>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="fullNames" value="Full Names" />
              </div>
              <TextInput
                ref={fullNamesRef}
                id="fullNames"
                placeholder="FirstName LastName"
                required={true}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                ref={emailRef}
                id="email"
                placeholder="name@company.com"
                required={true}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="phone" value="Phone Number" />
              </div>
              <TextInput
                ref={phoneRef}
                id="phone"
                placeholder="Phone Number"
                required={false}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="comment" value="Your message" />
              </div>
              <Textarea
                ref={messageRef}
                id="comment"
                placeholder="I would like more details about this property."
                defaultValue="I would like more details about this property."
                required={true}
                rows={3}
              />
            </div>

            <div className="w-full flex justify-center items-center">
              <Button className="w-2/3 full-btn" onClick={handleSubmit}>
                Email Agent
              </Button>
            </div>
            <p className="text-xs">
              By proceeding, you consent to receive calls and texts at the
              number you provided, including marketing by autodialer and
              prerecorded and artificial voice, and email, from 254realtors.com
              and others about your inquiry and other home-related matters, but
              not as a condition of any purchase. You also agree to our Terms of
              Use, and to our Privacy Policy regarding the information relating
              to you. This consent applies even if you are on a corporate, state
              or national Do Not Call list.
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

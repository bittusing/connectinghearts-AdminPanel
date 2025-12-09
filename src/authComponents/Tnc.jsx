import React from 'react'

function Tnc() {
  const containerStyle = {
    maxWidth: '80%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '3rem',
    marginTop:'5%',
    textAlign: 'center',
    textTransform:'uppercase',
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '15px',
  };

  return (
    <div style={containerStyle}>
    <h2 style={headingStyle}>TERMS AND CONDITIONS</h2>
    <p style={paragraphStyle}>
      I understand that I will have access to confidential information regarding medical histories, group contractual matters, and other business-related records of patients, employees, and the organization.
    </p>
    <p style={paragraphStyle}>
      I understand that it is the policy and practice of CCMG and its facilities to comply with the Health Insurance Portability Accountability Act (HIPAA) regarding the use and disclosure of confidential patient information. I understand that privacy is the legal right of each patient, employee, and the organization, and that medical or personal information cannot be released to anyone without the prior written consent of the patient or employee.
    </p>
    <p style={paragraphStyle}>
      I also understand that contractual and business-related matters are proprietary and are to be kept in strictest confidence.
    </p>
    <p style={paragraphStyle}>
      I understand and agree that reading medical or business records for personal reasons shall result in immediate termination of my relationship with CCMG.
    </p>
    <p style={paragraphStyle}>
      I understand and agree that if at any time my activities require computer access, I am not to provide my password to anyone or log on myself and then allow another individual to access the computer through my password. If I do, it shall result in immediate termination of my relationship with CCMG.
    </p>
    <p style={paragraphStyle}>
      I understand and agree that at no time – whether in or out of group facilities – will information regarding a patient or employee of the Group be revealed to anyone other than those authorized to receive it because of a business "need-to-know".
    </p>
    <p style={paragraphStyle}>
      I understand that releasing confidential information concerning a patient or employee to those not authorized to receive such information is unlawful, a violation of HIPAA, and shall result in immediate termination of my relationship with CCMG.
    </p>
    <p style={paragraphStyle}>
      I agree that the giving of information concerning a patient or employee to those not authorized to receive such information, including but not limited to gossip, careless remarks, and idle chatter in or away from CCMG facilities, is a serious breach of confidentiality and trust, which may result in immediate termination of my relationship with CCMG. I, therefore, agree to respect the confidentiality of all medical, personal, and business-related information pertaining to patients, employees, and the organization; and to make no voluntary disclosure of such information except to persons expressly authorized to receive them because of a business "need-to-know" such information.
    </p>
  </div>
  )
}

export default Tnc

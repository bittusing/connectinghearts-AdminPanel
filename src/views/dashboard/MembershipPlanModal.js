import React, { useState } from 'react';
import { Modal, Radio, Card } from 'antd';
import './dashboard.css'
const MembershipPlanModal = ({isOpen, handleOk, onCancel, memberShipList }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

 
   

  const clearPlan = () => { 
    setSelectedPlan(null);
    onCancel()
  };
  const handleChange = (e) => {
    console.log(e); 
    setSelectedPlan(e);
  };

 const handlePressOk = ()=>{
    handleOk(selectedPlan)
 }
  return (
    <Modal
    width={1000}
      title="Select Membership Plan"
      visible={isOpen} 
      onOk={handlePressOk}
      onCancel={clearPlan}
    >
      <Radio.Group value={selectedPlan} className='ms-radio-group'>
        {memberShipList.map((plan, index) => (
          <div key={index} className={'membershipcard ' + (plan._id == selectedPlan ? 'active':"")} style={{ margin: '8px' }}>
            <Radio value={plan._id} data-plan-id={plan._id} onChange={() => handleChange(plan._id)}>
              <div >
                  <div> <h2>{plan.planName} Plan</h2>  <h3 style={{marginTop:10}}>{plan?.currency} <span>{plan?.membershipAmount}</span></h3></div>
                 <ul>
                   {
                    plan?.features?.map(item=>{
                      return <li> {item}</li>
                    })
                   } 
                 </ul>
              </div>

            </Radio>           
          </div>
        ))}
      </Radio.Group>
    </Modal>
  );
};

export default MembershipPlanModal;

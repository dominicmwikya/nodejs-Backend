import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../../Components/UI/Modals'
import Card from '../../Components/UI/Cards'
export default function Index() {
    const[show, setShow]=useState(false);
    const showModal=()=>setShow(true);
    const closeModal=()=>setShow(false)
  const [inputs, setInputs] = useState([]);

  const addInput = () => {
    const newInput = { id: uuidv4(), name: '', value: '' };
    setInputs([...inputs, newInput]);
  };

  const removeInput = (id) => {
    const newInputs = inputs.filter((input) => input.id !== id);
    setInputs(newInputs);
  };

  const handleInputChange = (id, e) => {
    const newInputs = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, [e.target.name]: e.target.value };
      }
      return input;
    });
    setInputs(newInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted inputs:', inputs);
  };

  return (
    <>
      <i className='btn fa fa-plus ' onClick={showModal} 
                    style={{color:"green", color:'white', backgroundColor:'green',
                    margin: '10px 0px', borderRadius:'5px', padding:'10px 40px'}}>
                </i>
      <Modal  show={show} onClose={closeModal} header="Add Purchases"  footer="New Purchases">
        <Card _cardName="Purchased">
        <form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <div key={input.id}>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => handleInputChange(input.id, e)}
            placeholder="Name"
          />
          <input
            type="text"
            name="value"
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e)}
            placeholder="Value"
          />
          <button type="button" onClick={() => removeInput(input.id)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addInput}>
        Add input
      </button>
      <button type="submit">Submit</button>
    </form>
        {/* <Itemform data={items} values={values} handleValueChange={handleValueChange} handleSubmit={handleSubmit} /> */}
        </Card>
      </Modal>
    </>

  );
}

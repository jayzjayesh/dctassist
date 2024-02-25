import React, { useState, useEffect } from 'react';
import { transactions, peopleOptions } from '../constants';
import AccordionComponent from './Accordion';
import getEachPersonTotal from '../utils';


const Receipt = () => {
    const [updatedTransaction, setUpdatedTransaction] = useState(transactions);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChangePeopleItem = (value, selected, receiptItem) => {
        const updatedList = updatedTransaction.items.map((op) => {
            if (op.id === receiptItem.id) {
                if (selected) {
                    const updatedSplit = op.split.filter((peopleId) => peopleId != value)
                    return { ...op, split: updatedSplit };
                } else {
                    if(op.split){
                    op.split.push(value)
                    }else{
                        op['split'] = [value]
                    }
                    return op;
                }
            }
            return op
        });
        setUpdatedTransaction({...updatedTransaction, items: updatedList});
    }

    const eachPersonTotal = getEachPersonTotal(updatedTransaction.items);

    const onFileUpload = async (event) => {
        const imageInput = document.getElementById('myFile');
        const formData = new FormData();
        setLoading(true);
        formData.append('user_image', imageInput.files[0]);

        try {
            const response = await fetch('https://paisa-backend.onrender.com/chat', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setLoading(false);
            setImageUploaded(true);
            setUpdatedTransaction({...updatedTransaction, ...data})
        } catch (error) {
            setLoading(false);
            setImageUploaded(false);
            console.error('Error uploading image:', error);
        }
    }


    return (
        <div id="showScroll" class="container">
            <div class="receipt">
                <h1 className="logo">Receipt</h1>
                <img className='paisaLogo' src='paisa_logo.png'/>
                {!imageUploaded && !loading &&
                    <form action="/action_page.php">
                        <input type="file" id="myFile" name="filename" onChange={onFileUpload}></input>
                    </form>}
                {loading && <div>Generating..............................</div>}
                {imageUploaded && <div>
                    <div class="address">
                        35 N Main St, Cincinnati, OH 40001
                    </div>
                    <div class="transactionHeader">
                        <div class="detail">Invoice#{updatedTransaction.invoice_number}</div>
                    </div>
                    <div class="transactionHeader">
                        Store Name: {updatedTransaction.store_name}
                    </div>
                    <div class="transactionDetails">
                        {updatedTransaction.items.map((item, index) => (
                            <AccordionComponent
                                options={peopleOptions}
                                item={item}
                                index={index}
                                onChange={onChangePeopleItem}
                            />
                        ))}
                    </div>
                    <div class="survey bold">
                        <p>Survey ID #</p>
                        <p class="surveyID">6588 4755 3256 544 21</p>
                    </div>
                    <div class="paymentDetails">
                        <div class="detail">TAXES</div>
                        <div class="detail">${updatedTransaction.tax}</div>
                    </div>

                    {eachPersonTotal.map(({ label, share }) => (
                        <div class="paymentDetails">
                            <div class="detail">{label}</div>
                            <div class="detail">${share}</div>
                        </div>
                    ))}
                    <div class="paymentDetails bold">
                        <div class="detail">TOTAL</div>
                        <div class="detail">${updatedTransaction.subtotal}</div>
                    </div>
                    <div class="creditDetails">
                        <p>VISA CREDIT &nbsp;&nbsp;&nbsp;&nbsp; ************{updatedTransaction.debit_card_number}</p>
                        <p>approved# {updatedTransaction.debit_card_number}</p>
                        <p>ref# {updatedTransaction.receipt_number}</p>
                        <p>tran type: SALE</p>
                        <p>AID: 30000000090755</p>
                        <p>TC: B7A2A4044AEE380A4</p>
                        <p>no signature required</p>
                        <p>CVM: 1e0300</p>
                    </div>
                    <div class="receiptBarcode">
                        <div class="barcode">
                            HelloCVSScript
                        </div>
                        2003 0998 9000 8730 21
                        <p className='note'>
                            Taxes and Items with 0 split are split equally
                        </p>
                    </div>
                    <div class="feedback">
                        <div class="break">{updatedTransaction.invoice_date}</div>
                        <div class="break">{updatedTransaction.invoice_time}</div>
                        <div class="break">
                            *************************************
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Receipt;
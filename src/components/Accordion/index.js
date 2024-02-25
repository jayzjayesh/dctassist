import { useState, React } from "react";

const AccordionComponent = ({ options,item,index,onChange}) => {
    const [active, setActive] = useState(false);
    const checkSelected = (personItemId) => item.split && item.split.includes(personItemId);

    return (
        <div class="accordion">
            <button class="accordion-header" onClick={() => setActive(!active)}>
                <div className='transactionDetailItem'>
                    <div className="detail">{index+1}</div>
                    <div className="detail detail-flexBasis">{item.item_name}</div>
                    <div className="detail">${item.total}</div>
                    <div className='circle'>{item.split?.length || 0}</div>
                    <svg class="arrow" viewBox="0 0 320 512" width="16" title="angle-down">
                        <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
                    </svg>
                </div>
            </button>
            <div class={`accordion-body ${active ? 'active' : ''}`}>
                {options.map((personItem) =>{ 
                const isSelected = checkSelected(personItem.id);
               return (
               <div className={`chip ${isSelected ? 'circle' : ''}`} onClick={() => onChange(personItem.id, isSelected, item)}>
                    {personItem.label}
               </div>
               )
            })}
            </div>
        </div>
    )
}

export default AccordionComponent;
import { createSignal } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";
import './Quantity.css';

function Quantity() {
    const [quantity, setQuantity] = createSignal("");
    const navigate = useNavigate();
    const location = useLocation();
    const barcode = location.state.value;

    const addDigit = (digit) => {
        setQuantity(quantity().concat(digit));
    };

    const clearDigits = () => {
        setQuantity('');
    };

    const buttons = [
        {
            keyCode: 48,
            trigger: '0',
            isDigit: true
        },
        {
            keyCode: 49,
            trigger: '1',
            isDigit: true
        },
        {
            keyCode: 50,
            trigger: '2',
            isDigit: true
        },
        {
            keyCode: 51,
            trigger: '3',
            isDigit: true
        },
        {
            keyCode: 52,
            trigger: '4',
            isDigit: true
        },
        {
            keyCode: 53,
            trigger: '5',
            isDigit: true
        },
        {
            keyCode: 54,
            trigger: '6',
            isDigit: true
        },
        {
            keyCode: 55,
            trigger: '7',
            isDigit: true
        },
        {
            keyCode: 56,
            trigger: '8',
            isDigit: true
        },
        {
            keyCode: 57,
            trigger: '9',
            isDigit: true
        },
        {
            keyCode: 8,
            trigger: 'Backspace',
            isDigit: false
        },
        {
            keyCode: 13,
            trigger: 'Enter',
            isDigit: false
        },
        {
            keyCode: 27,
            trigger: 'Escape',
            isDigit: false
        },
    ];

    function keyDownEvent(e) {
        try {
            const buttonKey = buttons.find(obj => obj.keyCode === e.keyCode)

            if(buttonKey.isDigit === true) {
                addDigit(buttonKey.trigger);
            }

            // Backspace (clear/erase barcode)
            if(buttonKey.trigger === 'Backspace') {
                clearDigits();
            }

            // Enter (saving barcode choice)
            if(buttonKey.trigger === 'Enter') {
                printBarcode(barcode);
            }

            // Escape (for settings)
            if(buttonKey.trigger === 'Escape') {
                // Nothing
            }
        } catch (e) {
            console.error(e);
        }
    };

    const printBarcode = () => {
        var zplStr = `^XA ^FO150,25^BY3 ^B2N,150,Y,N,N ^FD${barcode}^FS ^XZ`;
        var cmds = new Array(parseInt(quantity())).fill(zplStr).join("\n");
    
        var printWindow = window.open();
        printWindow.document.open('text/plain')
        printWindow.document.write(cmds);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close(); // Will close in Tauri, not browser

        goBack(); // Go back to barcode page
    };

    const goBack = () => {
        navigate("/");
    }

    return (
    <div className="quantity-layout" onKeyDown={keyDownEvent} tabIndex={0}>
        <div className="quantity-display">
            <p className="quantity-text">Quantity: {quantity()}</p>
            <p className="quantity-subtitle">Current Barcode: {barcode}</p>
        </div>

        <div className="quantity-grid-layout">
            <button className="quantity-grid-item" onClick={() => addDigit('1')}>1</button>
            <button className="quantity-grid-item" onClick={() => addDigit('2')}>2</button>
            <button className="quantity-grid-item" onClick={() => addDigit('3')}>3</button>
            <button className="quantity-grid-item" onClick={() => addDigit('4')}>4</button>
            <button className="quantity-grid-item" onClick={() => addDigit('5')}>5</button>
            <button className="quantity-grid-item" onClick={() => addDigit('6')}>6</button>
            <button className="quantity-grid-item" onClick={() => addDigit('7')}>7</button>
            <button className="quantity-grid-item" onClick={() => addDigit('8')}>8</button>
            <button className="quantity-grid-item" onClick={() => addDigit('9')}>9</button>
            <button className="quantity-grid-item quantity-item-zero" onClick={() => addDigit('0')}>0</button>
            <button className="quantity-grid-item quantity-item-enter quantity-item-unique" onClick={() => printBarcode()}>=</button>
            <button className="quantity-grid-item quantity-item-controls" onClick={() => clearDigits()}>C</button>
            <button className="quantity-grid-item quantity-item-controls" onClick={() => goBack()}>BACK</button>
        </div>
    </div>
    );
};

export default Quantity;
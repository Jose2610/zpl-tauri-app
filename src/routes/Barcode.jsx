import { createSignal, createEffect } from "solid-js";
import "./Barcode.css";
import { useNavigate } from "@solidjs/router";

function Barcode() {
    const [barcode, setBarcode] = createSignal("0000");
    const [select, setSelection] = createSignal(false);
    const navigate = useNavigate();

    const addDigit = (digit) => {
        setBarcode(barcode().substring(1).concat(digit));
    };

    const clearDigits = () => {
        setBarcode('0000');
    };

    const changePage = (code) => {
        navigate("/quantity", {state: {value: code}});
    };

    const goToSettings = () => {
        navigate('/settings');
    }

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
                changePage(barcode());
            }

            // Escape (for settings)
            if(buttonKey.trigger === 'Escape') {
                // Nothing
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="layout" onKeyDown={keyDownEvent} tabIndex={0}>
            <div className="display">
                <p className="text">Barcode: {barcode()}</p>
            </div>

            <div className="grid-layout">
                <button className="grid-item" onClick={() => addDigit('1')}>1</button>
                <button className="grid-item" onClick={() => addDigit('2')}>2</button>
                <button className="grid-item" onClick={() => addDigit('3')}>3</button>
                <button className="grid-item" onClick={() => addDigit('4')}>4</button>
                <button className="grid-item" onClick={() => addDigit('5')}>5</button>
                <button className="grid-item" onClick={() => addDigit('6')}>6</button>
                <button className="grid-item" onClick={() => addDigit('7')}>7</button>
                <button className="grid-item" onClick={() => addDigit('8')}>8</button>
                <button className="grid-item" onClick={() => addDigit('9')}>9</button>
                <button className="grid-item item-zero" onClick={() => addDigit('0')}>0</button>
                <button className="grid-item item-enter item-unique" onClick={() => changePage(barcode())}>=</button>
                <button className="grid-item item-controls" onClick={() => clearDigits()}>C</button>
                <button className="grid-item item-controls" onClick={() => goToSettings()}>S</button>
            </div>
        </div>
    );
}

export default Barcode;
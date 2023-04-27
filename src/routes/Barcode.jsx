import { createSignal, createEffect } from "solid-js";
import "./Barcode.css";

function Barcode() {
    const startingSet = [
        {
            "Barcode": "0001",
            "Quantity": "5"
        },
        {
            "Barcode": "0002",
            "Quantity": "5"
        },
        {
            "Barcode": "0003",
            "Quantity": "5"
        },
        {
            "Barcode": "0004",
            "Quantity": "5"
        },
        {
            "Barcode": "0005",
            "Quantity": "5"
        },
        {
            "Barcode": "0006",
            "Quantity": "5"
        }
    ];

    const currSet = [{
        "Barcode": "0006",
        "Quantity": "5"
    }]

    const [currentSet, setCurrentSet] = createSignal(currSet);    
    const [barcode, setBarcode] = createSignal("0000");
    const [quantity, setQuantity] = createSignal("1")
    const [recent, setRecent] = createSignal(startingSet);

    const addDigit = (digit) => {
        setBarcode(barcode().substring(1).concat(digit));
    };

    const clearDigits = () => {
        setBarcode('0000');
    };

    const handleQuantity = (event) => {
        setQuantity(event.target.value)
    };

    const quickAccessSelection = (code, count) => {
        setBarcode(code);
        setQuantity(count);
        printBarcode();
    }

    const printBarcode = () => {
        var zplStr = `^XA ^FO150,25^BY3 ^B2N,150,Y,N,N ^FD${barcode()}^FS ^XZ`;
        var cmds = new Array(parseInt(quantity())).fill(zplStr).join("\n");
    
        var printWindow = window.open();
        printWindow.document.open('text/plain')
        printWindow.document.write(cmds);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close(); // Will close in Tauri, not browser

        let newRecent = [{
            "Barcode": barcode(),
            "Quantity": quantity()
        }];

        setCurrentSet(newRecent);
        checkingRecents();
    };

    const cycleQuickAccess = () => {
        const newRecent = [...recent()]
        newRecent.push(currentSet()[0]);
        newRecent.shift();
        setRecent(newRecent)
    };

    const checkingRecents= () => {
        let isHere = false;
        for(var i = 0; i < recent().length; i++) {
            if(recent()[i].Barcode === currentSet()[0].Barcode && recent()[i].Quantity === currentSet()[0].Quantity) {
                isHere = true
            }
        };
        if(!isHere) cycleQuickAccess();
    };

    createEffect(() => {
        console.log("New recent is: ", recent());
    });

    return (
            <div className="layout">
                <div className="controls">
                    <div className="grid-layout">
                        <p className="subtext item-text">Barcode: {barcode()}</p>
                        <button className="grid-item" onClick={() => addDigit('1')}>1</button>
                        <button className="grid-item" onClick={() => addDigit('2')}>2</button>
                        <button className="grid-item" onClick={() => addDigit('3')}>3</button>
                        <button className="grid-item" onClick={() => addDigit('4')}>4</button>
                        <button className="grid-item" onClick={() => addDigit('5')}>5</button>
                        <button className="grid-item" onClick={() => addDigit('6')}>6</button>
                        <button className="grid-item" onClick={() => addDigit('7')}>7</button>
                        <button className="grid-item" onClick={() => addDigit('8')}>8</button>
                        <button className="grid-item" onClick={() => addDigit('9')}>9</button>
                        <button className="grid-item" onClick={() => addDigit('0')}>0</button>
                        <button className="grid-item item-clear" onClick={() => clearDigits()}>CLEAR</button>
                    </div>

                    <div className="quantity-section">
                        <p className="subtext quantity-text">Quantity: {quantity()}</p>

                        <div className="quantity-item" onChange={handleQuantity}>
                            <div className="quantity-centering">
                                <input type="radio" id="one" name="quantity-type" value="1" checked/>
                                <label for="one">1</label>
                            </div>

                            <div className="quantity-centering">
                                <input type="radio" id="five" name="quantity-type" value="5" />
                                <label for="five">5</label>
                            </div>

                            <div className="quantity-centering">
                                <input type="radio" id="ten" name="quantity-type" value="10" />
                                <label for="ten">10</label>
                            </div>

                            <div className="quantity-centering">
                                <input type="radio" id="twenty-five" name="quantity-type" value="25"/>
                                <label for="twenty-five">25</label>
                            </div>

                            <div className="quantity-centering">
                                <input type="radio" id="fifty" name="quantity-type" value="50" />
                                <label for="fifty">50</label>
                            </div>

                            <div className="quantity-centering">
                                <input type="radio" id="hundred" name="quantity-type" value="100" />
                                <label for="hundred">100</label>
                            </div>
                        </div>
                    </div>

                    <div className="quick-access">
                        {recent().map((x) => {
                            return (
                            <button className="recent-item" onClick={() => quickAccessSelection(x.Barcode, x.Quantity)}>
                                <p>Barcode: {x.Barcode}</p>
                                <p>Quantity: {x.Quantity}</p>
                            </button>
                        )})}
                    </div>
                </div>

                <div className="display">
                    <button className="enter-button" onClick={() => printBarcode()}>PRINT</button>
                </div>
            </div>
    );
}

export default Barcode;
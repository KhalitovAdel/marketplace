import React from 'react';
import JsBarcode from "jsbarcode";

export type BarcodeProps = {
    children?: React.ReactNode;
};

export function Barcode(p: BarcodeProps): React.ReactNode {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!ref) return;
        if (!ref.current) return;
        
        const c = document.createElement("canvas");
        JsBarcode(c, '978020137962', { format: 'EAN13', flat: true });
        ref.current.appendChild(c);

        return () => {
            c.remove();
        }
      }, [ref]);

    return <div ref={ref}>{p.children}</div>;
}
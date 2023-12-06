import React, { useState } from 'react';
import JsBarcode from "jsbarcode";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import { SxProps, Theme } from '@mui/material/styles';

export type PureBarcodeProps = {
    barcode: string;
    organization: string;
    productName: string;
    vendorCode: string;
    color: string;
    size: string;
    country: string;
    composition: string;
    recommendation?: string;
};

export function PureBarcode(p: PureBarcodeProps): React.ReactNode {
    const ref = React.useRef<SVGSVGElement>(null);
    const [contentWrapper, setContentWrapper] = useState<HTMLDivElement>();

    React.useEffect(() => {
        if (!ref) return;
        if (!ref.current) return;

        JsBarcode(ref.current, p.barcode, { 
            format: 'EAN13', 
            flat: true,
            margin: 0,
            marginBottom: 1,
        });

      }, [ref, p.barcode]);

    return <Stack sx={sx.root}>
        <Box height={contentWrapper ? 400 - (contentWrapper.getBoundingClientRect().height + 16) : undefined} sx={sx.barcodeWrapper}>
            <SvgIcon ref={ref} sx={sx.barcode}/>
        </Box>
        <Box ref={setContentWrapper}>
            <Typography>{p.organization}</Typography>
            <Typography>{p.productName}</Typography>
            <Typography>Артикул: {p.vendorCode}</Typography>
            <Typography>Цв.: {p.color} / Раз.: {p.size}</Typography>
            <Typography>Страна: {p.country}</Typography>
            <Typography>Состав: {p.composition}</Typography>
            {!!p.recommendation && <Typography>{p.recommendation}</Typography>}
        </Box>
    </Stack>;
}

const sx: Record<string, SxProps<Theme>> = {
    root: {
        width: 580,
        height: 400,
        display: 'block',
        boxSizing: 'border-box',
        paddingTop: 1,
        paddingBottom: 1,
        paddingRight: 3,
        paddingLeft: 3,
        '& p': {
            marginBottom: 0,
            textAlign: 'center',
            fontWeight: 400
        }
    },
    barcodeWrapper: {
        display: 'flex',
    },
    barcode: {
        width: '100%',
        height: 'auto',
        marginBottom: 1,
    }
};
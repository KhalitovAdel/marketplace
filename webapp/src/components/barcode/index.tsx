/* eslint-disable react-hooks/exhaustive-deps */
import Stack from '@mui/material/Stack';
import React, { CSSProperties, useCallback, useRef, useState } from 'react';
import { PureBarcode, PureBarcodeProps } from './pure-barcode';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
// @ts-ignore
import html2pdf from "html2pdf.js";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslate } from 'react-admin';

export type BarcodeProps = {
    children?: React.ReactNode;
};

export function Barcode(): React.ReactNode {
    const iframe = useRef<HTMLIFrameElement>(null);
    const [buttonRef, setButtonRef] = useState<HTMLElement | null>();
    const [open, setOpen] = useState(false);
    const translate = useTranslate();

    const prop = {
        barcode: '2038828082791',
        organization: 'ИП Вафина Диана Ниазовна',
        productName: 'Комплект распашонок 3 шт',
        vendorCode: 'wb64lo053z',
        color: 'Молочный',
        size: '62',
        country: 'Россия',
        composition: '100% хлопок',
        recommendation: 'Ручная или машинная стирка в деликатном режиме при температуре не выше 40 градусов. При стирке изделие вывернуть наизнанку. Не использовать отбеливатель и хлорсодержащие вещества',
    };

    const handleDownload = useCallback((fileName: string) => {
        const doc = new html2pdf;
        doc
        .from(iframe.current!.contentWindow!.document.querySelector('body')!)
        .set({jsPDF: { unit: 'px', format: [580, 400], orientation: 'l' }})
        .save(`${fileName}.pdf`);
    }, [prop.barcode, prop.vendorCode])

    const renderAndDownload = useCallback((isFull?: boolean) => {
        if (!iframe.current) return;
        
        const iframeWindow = iframe.current.contentWindow;
        if (!iframeWindow) return;

        const head = iframeWindow.document.querySelector<HTMLHeadElement>('head');
        const body = iframeWindow.document.querySelector('body');
    
        if (!body) return;
        if (!head) return;

        const media = iframeWindow.document.createElement('style');
        media.innerText = `@media print {
    @page {
        size: 580px 400px;
    }
    body {
        margin: 0;
    }
}`;

        head.appendChild(media);

        const cache = createCache({
            container: body,
            key: 'mui-barcode'
        });

        let p: PureBarcodeProps;
        if (isFull) {
            p = {...prop, recommendation: prop.recommendation || 'TODO: Рекомендации не предоставлены'}
        } else {
            // eslint-disable-next-line no-unused-vars
            const { recommendation, ...other } = prop;
            p = other;
        }

        createRoot(body).render(
            <CacheProvider value={cache}>
                <ThemeProvider theme={createTheme()}>
                    <PureBarcode {...p} />
                </ThemeProvider>
            </CacheProvider>
        );

        handleDownload(`${prop.vendorCode}-${prop.barcode}${isFull ? '-f' : ''}`);
    }, [iframe, prop]);

    return <Stack>
        <IconButton ref={setButtonRef} onClick={useCallback(() => setOpen(true), [])}>
            <QrCode2Icon />
        </IconButton>
        <Menu anchorEl={buttonRef} open={open} onClose={useCallback(() => setOpen(false), [])}>
            <MenuItem onClick={() => renderAndDownload()}>{translate('ra.barcode.on-clothes')}</MenuItem>
            <MenuItem onClick={() => renderAndDownload(true)}>{translate('ra.barcode.with-recommendation')}</MenuItem>
        </Menu>
        <iframe ref={iframe} style={style.iframe} />
    </Stack>;
}

const style: Record<string, CSSProperties> = {
    iframe: {
        width: 0,
        height: 0,
        border: 0,
        overflow: '',
    }
}
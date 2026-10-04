'use client';
import { QRCodeSVG } from 'qrcode.react';
export default function QRCard({url,code}){
  return <div className="qrCard"><QRCodeSVG value={url} size={150}/><div><strong>{code}</strong><small>Scan untuk refleksi & absensi</small></div></div>
}

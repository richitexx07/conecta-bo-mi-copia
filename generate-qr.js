// Script para generar código QR y mostrar información de acceso
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');

const LOCAL_IP = '192.168.100.16';
const PORT = 3000;
const URL = `http://${LOCAL_IP}:${PORT}`;

async function generateQR() {
  try {
    // Generar QR como imagen SVG
    const qrSvg = await qrcode.toString(URL, {
      type: 'svg',
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Guardar SVG
    const svgPath = path.join(__dirname, 'qr-code.svg');
    fs.writeFileSync(svgPath, qrSvg);
    console.log(`✅ Código QR generado: ${svgPath}`);

    // Generar también PNG para mejor compatibilidad
    const qrPng = await qrcode.toBuffer(URL, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    const pngPath = path.join(__dirname, 'qr-code.png');
    fs.writeFileSync(pngPath, qrPng);
    console.log(`✅ Código QR PNG generado: ${pngPath}`);

    // Mostrar información
    console.log('\n📱 INFORMACIÓN DE ACCESO:');
    console.log('═'.repeat(50));
    console.log(`🌐 URL: ${URL}`);
    console.log('═'.repeat(50));
    console.log('\n📋 INSTRUCCIONES:');
    console.log('1. Asegúrate de que el servidor esté corriendo: npm run dev');
    console.log('2. Asegúrate de que tu celular esté en la misma red WiFi');
    console.log('3. Escanea el código QR o abre la URL en tu navegador móvil');
    console.log('\n💡 TIP: Si no puedes acceder, verifica el firewall de Windows');
    
    return { url: URL, svgPath, pngPath };
  } catch (error) {
    console.error('❌ Error generando QR:', error.message);
    throw error;
  }
}

generateQR();

import type { Cart, Customer } from '~/types'

export const useReceipt = () => {
  // ຂໍ້ມູນຮ້ານຄ້າ
  const storeInfo = {
    name: 'ຮ້ານຄ້າລາວ POS',
    address: '123 ຖະໜົນ 12 ສິງຫາ, ນະຄອນຫຼວງວຽງຈັນ',
    phone: '020-234-5678',
    email: 'info@laoshop.com',
    taxId: '123-456-789'
  }

  // ສ້າງ HTML ສຳຫຼັບໃບບິນ
  const generateReceiptHTML = (
    cart: Cart, 
    customer: Customer | null = null,
    paymentMethod: string = 'ເງິນສົດ',
    receiptNumber: string = generateReceiptNumber()
  ) => {
    const now = new Date()
    const dateStr = now.toLocaleDateString('lo-LA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
    const timeStr = now.toLocaleTimeString('lo-LA', {
      hour: '2-digit',
      minute: '2-digit'
    })

    return `
<!DOCTYPE html>
<html lang="lo">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ໃບຮັບເງິນ - ${receiptNumber}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans Lao', Arial, sans-serif;
            font-size: 14px;
            line-height: 1.4;
            color: #333;
            background: white;
        }
        
        .receipt {
            max-width: 400px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            background: white;
        }
        
        .header {
            text-align: center;
            border-bottom: 2px solid #FFD700;
            padding-bottom: 15px;
            margin-bottom: 15px;
        }
        
        .store-name {
            font-size: 20px;
            font-weight: bold;
            color: #002868;
            margin-bottom: 5px;
        }
        
        .store-info {
            font-size: 12px;
            color: #666;
            line-height: 1.3;
        }
        
        .receipt-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px dashed #ccc;
        }
        
        .receipt-number {
            font-weight: bold;
            color: #002868;
        }
        
        .customer-info {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
            font-size: 12px;
        }
        
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        
        .items-table th {
            background: #f1f1f1;
            padding: 8px 4px;
            text-align: left;
            font-size: 12px;
            border-bottom: 1px solid #ddd;
        }
        
        .items-table td {
            padding: 6px 4px;
            font-size: 12px;
            border-bottom: 1px solid #eee;
        }
        
        .text-right {
            text-align: right;
        }
        
        .text-center {
            text-align: center;
        }
        
        .totals {
            border-top: 2px solid #ddd;
            padding-top: 10px;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        
        .total-row.final {
            font-weight: bold;
            font-size: 16px;
            color: #002868;
            border-top: 1px solid #ccc;
            padding-top: 8px;
            margin-top: 8px;
        }
        
        .payment-info {
            background: #e8f4fd;
            padding: 10px;
            border-radius: 5px;
            margin: 15px 0;
            text-align: center;
        }
        
        .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px dashed #ccc;
            font-size: 12px;
            color: #666;
        }
        
        .thank-you {
            font-weight: bold;
            color: #002868;
            margin-bottom: 10px;
        }
        
        @media print {
            body {
                margin: 0;
                padding: 0;
            }
            
            .receipt {
                box-shadow: none;
                border: none;
                margin: 0;
                max-width: none;
                width: 100%;
            }
            
            .no-print {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="receipt">
        <!-- Header -->
        <div class="header">
            <div class="store-name">${storeInfo.name}</div>
            <div class="store-info">
                ${storeInfo.address}<br>
                ໂທ: ${storeInfo.phone} | ອີເມລ: ${storeInfo.email}<br>
                ເລກທະບຽນ: ${storeInfo.taxId}
            </div>
        </div>
        
        <!-- Receipt Info -->
        <div class="receipt-info">
            <div>
                <div class="receipt-number">ໃບຮັບເງິນເລກທີ່: ${receiptNumber}</div>
                <div>ວັນທີ: ${dateStr}</div>
                <div>ເວລາ: ${timeStr}</div>
            </div>
        </div>
        
        ${customer ? `
        <!-- Customer Info -->
        <div class="customer-info">
            <strong>ຂໍ້ມູນລູກຄ້າ:</strong><br>
            ຊື່: ${customer.firstName} ${customer.lastName}<br>
            ${customer.phone ? `ໂທ: ${customer.phone}<br>` : ''}
        </div>
        ` : ''}
        
        <!-- Items -->
        <table class="items-table">
            <thead>
                <tr>
                    <th>ສິນຄ້າ</th>
                    <th class="text-center">ຈຳນວນ</th>
                    <th class="text-right">ລາຄາ</th>
                    <th class="text-right">ລວມ</th>
                </tr>
            </thead>
            <tbody>
                ${cart.items.map(item => `
                <tr>
                    <td>
                        <div style="font-weight: 500;">${item.product.name}</div>
                        ${item.product.description ? `<div style="font-size: 11px; color: #666;">${item.product.description}</div>` : ''}
                    </td>
                    <td class="text-center">${item.quantity} ${item.product.unit}</td>
                    <td class="text-right">${item.price.toLocaleString()} ກີບ</td>
                    <td class="text-right">${item.subtotal.toLocaleString()} ກີບ</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Totals -->
        <div class="totals">
            <div class="total-row">
                <span>ລາຄາລວມ:</span>
                <span>${cart.subtotal.toLocaleString()} ກີບ</span>
            </div>
            
            ${cart.discountAmount > 0 ? `
            <div class="total-row">
                <span>ສ່ວນຫຼຸດ:</span>
                <span style="color: #dc2626;">-${cart.discountAmount.toLocaleString()} ກີບ</span>
            </div>
            ` : ''}
            
            <div class="total-row">
                <span>ອາກອນ VAT (10%):</span>
                <span>${cart.taxAmount.toLocaleString()} ກີບ</span>
            </div>
            
            <div class="total-row final">
                <span>ລວມທັງໝົດ:</span>
                <span>${cart.total.toLocaleString()} ກີບ</span>
            </div>
        </div>
        
        <!-- Payment Info -->
        <div class="payment-info">
            <strong>ວິທີຊຳລະເງິນ: ${paymentMethod}</strong><br>
            ຈຳນວນເງິນທີ່ຮັບ: ${cart.total.toLocaleString()} ກີບ<br>
            ເງິນທອນ: 0 ກີບ
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="thank-you">ຂອບໃຈທີ່ມາຊື້ເຄື່ອງ!</div>
            <div>ກະລຸນາເກັບໃບຮັບເງິນໄວ້ເປັນຫຼັກຖານ</div>
            <div style="margin-top: 10px;">
                📞 ຕິດຕໍ່ສອບຖາມ: ${storeInfo.phone}<br>
                🌐 www.laoshop.com
            </div>
        </div>
    </div>
</body>
</html>`
  }

  // ສ້າງເລກທີໃບບິນ
  const generateReceiptNumber = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const time = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    
    return `RC${year}${month}${day}${time}${random}`
  }

  // ພິມໃບບິນ
  const printReceipt = (cart: Cart, customer: Customer | null = null, paymentMethod: string = 'ເງິນສົດ') => {
    const receiptHTML = generateReceiptHTML(cart, customer, paymentMethod)
    // ສ້າງ window ໃໝ່ສຳຫຼັບພິມ
    const printWindow = window.open('', '_blank', 'width=400,height=600')
    
    if (printWindow) {
      printWindow.document.write(receiptHTML)
      printWindow.document.close()
      
      // ລໍຖ້າໃຫ້ໂຫຼດແລ້ວ
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
        }, 250)
      }
    }
  }

  // ดาวน์โหลดเป็น PDF (ใช้ jsPDF)
  const downloadReceiptPDF = async (cart: Cart, customer: Customer | null = null, paymentMethod: string = 'ເງິນສົດ') => {
    try {
      // Dynamic import jsPDF
      const { jsPDF } = await import('jspdf')
      
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, 200] // กว้าง 80mm (ขนาดใบเสร็จ)
      })

      const receiptNumber = generateReceiptNumber()
      const now = new Date()
      
      // ตั้งค่าฟอนต์
      doc.setFont('helvetica', 'normal')
      
      let y = 10
      const lineHeight = 4
      const pageWidth = 80
      
      // Header
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text(storeInfo.name, pageWidth/2, y, { align: 'center' })
      y += lineHeight + 2
      
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.text(storeInfo.address, pageWidth/2, y, { align: 'center' })
      y += lineHeight
      doc.text(`Tel: ${storeInfo.phone}`, pageWidth/2, y, { align: 'center' })
      y += lineHeight
      doc.text(`Tax ID: ${storeInfo.taxId}`, pageWidth/2, y, { align: 'center' })
      y += lineHeight + 3
      
      // เส้นคั่น
      doc.line(5, y, pageWidth-5, y)
      y += 3
      
      // Receipt Info
      doc.setFontSize(9)
      doc.text(`Receipt: ${receiptNumber}`, 5, y)
      y += lineHeight
      doc.text(`Date: ${now.toLocaleDateString('en-GB')}`, 5, y)
      y += lineHeight
      doc.text(`Time: ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`, 5, y)
      y += lineHeight + 2
      
      // Customer Info
      if (customer) {
        doc.line(5, y, pageWidth-5, y)
        y += 3
        doc.text(`Customer: ${customer.firstName} ${customer.lastName}`, 5, y)
        y += lineHeight
        if (customer.phone) {
          doc.text(`Phone: ${customer.phone}`, 5, y)
          y += lineHeight
        }
      }
      
      // เส้นคั่น
      doc.line(5, y, pageWidth-5, y)
      y += 3
      
      // Items Header
      doc.setFont('helvetica', 'bold')
      doc.text('Item', 5, y)
      doc.text('Qty', 45, y)
      doc.text('Price', 55, y)
      doc.text('Total', 68, y)
      y += lineHeight
      
      doc.line(5, y, pageWidth-5, y)
      y += 2
      
      // Items
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      
      cart.items.forEach(item => {
        // ชื่อสินค้า (ตัดบรรทัดถ้ายาว)
        const productName = item.product.name
        if (productName.length > 20) {
          const words = productName.split(' ')
          let line = ''
          for (const word of words) {
            if ((line + word).length > 20) {
              doc.text(line, 5, y)
              y += lineHeight
              line = word + ' '
            } else {
              line += word + ' '
            }
          }
          if (line.trim()) {
            doc.text(line.trim(), 5, y)
            y += lineHeight
          }
        } else {
          doc.text(productName, 5, y)
          y += lineHeight
        }
        
        // ย้อนกลับไปเขียนข้อมูลอื่น
        y -= lineHeight
        doc.text(`${item.quantity}`, 45, y)
        doc.text(`${item.price.toLocaleString()}`, 55, y)
        doc.text(`${item.subtotal.toLocaleString()}`, 68, y)
        y += lineHeight + 1
      })
      
      // เส้นคั่น
      y += 2
      doc.line(5, y, pageWidth-5, y)
      y += 3
      
      // Totals
      doc.setFontSize(9)
      doc.text('Subtotal:', 5, y)
      doc.text(`${cart.subtotal.toLocaleString()} LAK`, pageWidth-5, y, { align: 'right' })
      y += lineHeight
      
      if (cart.discountAmount > 0) {
        doc.text('Discount:', 5, y)
        doc.text(`-${cart.discountAmount.toLocaleString()} LAK`, pageWidth-5, y, { align: 'right' })
        y += lineHeight
      }
      
      doc.text('VAT (10%):', 5, y)
      doc.text(`${cart.taxAmount.toLocaleString()} LAK`, pageWidth-5, y, { align: 'right' })
      y += lineHeight + 2
      
      // Total
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('TOTAL:', 5, y)
      doc.text(`${cart.total.toLocaleString()} LAK`, pageWidth-5, y, { align: 'right' })
      y += lineHeight + 3
      
      // Payment
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.line(5, y, pageWidth-5, y)
      y += 3
      doc.text(`Payment: ${paymentMethod}`, 5, y)
      y += lineHeight + 3
      
      // Footer
      doc.setFontSize(8)
      doc.text('Thank you for your purchase!', pageWidth/2, y, { align: 'center' })
      y += lineHeight
      doc.text('Please keep this receipt', pageWidth/2, y, { align: 'center' })
      
      // บันทึกไฟล์
      doc.save(`receipt-${receiptNumber}.pdf`)
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw new Error('ไม่สามารถสร้าง PDF ได้')
    }
  }

  // ส่งใบเสร็จทาง Email (จำลอง)
  const emailReceipt = async (email: string, cart: Cart, customer: Customer | null = null, paymentMethod: string = 'ເງິນສົດ') => {
    // จำลองการส่ง email
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Email receipt sent to: ${email}`)
        resolve({ success: true, message: `ส่งใบเสร็จไปยัง ${email} แล้ว` })
      }, 1000)
    })
  }

  return {
    printReceipt,
    downloadReceiptPDF,
    emailReceipt,
    generateReceiptHTML,
    generateReceiptNumber
  }
}
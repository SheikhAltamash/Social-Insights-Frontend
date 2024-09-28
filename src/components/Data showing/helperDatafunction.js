import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const downloadPdfWithLinks = (imageUrl, links, idx) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS issues
    img.src = imageUrl;

    img.onload = () => {
      const pdf = new jsPDF("p", "pt", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const aspectRatio = img.width / img.height;
      let imgWidth = pdfWidth - 40;
      let imgHeight = imgWidth / aspectRatio;

      if (imgHeight > pdfHeight - 100) {
        imgHeight = pdfHeight - 100;
        imgWidth = imgHeight * aspectRatio;
      }

      const topMargin = 20;

      // Add post image as the cover image in the PDF
      pdf.addImage(img, "JPEG", 20, topMargin, imgWidth, imgHeight);

      let startY = imgHeight + topMargin + 20;
      const buttonWidth = 100;
      const buttonHeight = 30;
      const buttonMargin = 10;
      const buttonCount = links.length;
      const totalButtonWidth =
        buttonCount * buttonWidth + (buttonCount - 1) * buttonMargin;
      const startX = (pdfWidth - totalButtonWidth) / 2;

      links.forEach((link, index) => {
        const buttonText = `Link ${index + 1}`;

        // Draw button background
        pdf.setFillColor("#3388ff");
        pdf.roundedRect(
          startX + index * (buttonWidth + buttonMargin),
          startY,
          buttonWidth,
          buttonHeight,
          7,
          7,
          "F"
        );

        // Draw button text
        pdf.setTextColor("white");
        pdf.setFontSize(14);
        pdf.text(
          buttonText,
          startX + index * (buttonWidth + buttonMargin) + buttonWidth / 2,
          startY + buttonHeight / 2 + 5,
          { align: "center" }
        );

        // Add link to the button using jsPDF's link method
        pdf.link(
          startX + index * (buttonWidth + buttonMargin),
          startY,
          buttonWidth,
          buttonHeight,
          { url: link }
        );
      });

      pdf.save(`post${idx+1}.pdf`);
      resolve();
    };

    img.onerror = (err) => {
      console.error("Error loading image:", err);
      reject(err);
    };
  });
};

const downloadAllPdfsAtATime = async (posts) => {
  if (window.confirm("Are you sure you want to download all posts?")) {
    let idx = 0; // Initialize idx once before the loop
    for (const post of posts) {
      try {
        await downloadPdfWithLinks(post.cloudinary_url, post.links, idx);
        await new Promise((resolve) => setTimeout(resolve, 300)); // Add a delay between downloads
        idx++; // Increment idx after each successful download
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    }
  }
};

export  { downloadAllPdfsAtATime, downloadPdfWithLinks };

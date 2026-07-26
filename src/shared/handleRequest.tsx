export  const handleRequest = (message: string) => {
    const whatsappURL = `https://wa.me/2348062326630?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };
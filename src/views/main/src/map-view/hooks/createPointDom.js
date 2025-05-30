export function createPointDom( type, speedParam = 2) {
  const colorList = [
    {
      type: "cn",
      color: "#F2EA3F",
    },
    {
      type: "sj",
      color: "#1DEBFF",
    },
    {
      type: "xq",
      color: "#B4FACA",
    },
    {
      type: "gyl",
      color: "#B793FF ",
    },
    {
      type: "wl",
      color: "#FBD8B5",
    },
  ];

  function getColor(type) {
    const colorObj = colorList.find((item) => item.type === type);
    return colorObj?.color || "#979797";
  }
  const color = getColor(type);
  const wrapper = document.createElement("div");
  wrapper.style.width = "24px";
  wrapper.style.height = "24px";
  wrapper.style.border = `2px solid ${color}`;
  wrapper.style.borderRadius = "20px";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";
  wrapper.style.boxShadow = `0 0 10px ${color}`;

  const content = document.createElement("div");
  content.style.width = "16px";
  content.style.height = "16px";
  content.style.borderRadius = "20px";
  content.style.backgroundColor = color;
  content.style.animation = `breatheContent ${speedParam}s infinite ease-in-out`;

  // Append animation keyframes to the document if not already added
  if (!document.getElementById("breathe-style")) {
    const style = document.createElement("style");
    style.id = "breathe-style";
    style.innerHTML = `
        @keyframes breatheContent {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `;
    document.head.appendChild(style);
  }

  wrapper.appendChild(content);
  return wrapper;
}

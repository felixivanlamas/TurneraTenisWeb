<template>
  <div class="footer">
    <div class="container">
      <div class="footer-content">
        <p class="footer-text">&copy; 2023 Grupo4 PNT2</p>
        <p class="footer-text">|</p>
        <p class="footer-text">Yatay 240, Almagro, CABA</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background-color: #f8f8f8;
  color: #333;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.container {
  max-width: 100%;
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.footer-text {
  margin: 5px 10px;
}
</style>

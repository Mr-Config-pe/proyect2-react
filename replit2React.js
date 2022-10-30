const store = () => {
  const products = [];

  const obj = {
    addProduct(product) {
      products.push(product);
    },

    removeProduct(product) {
      const indexRemove = products.indexOf(product);
      products.splice(indexRemove, 1);
    },

    listProducts() {
      return products;
    },
  };

  return obj;
};

const myStore = store();
myStore.addProduct("phones");
myStore.addProduct("cereal");
myStore.removeProduct("phones");
myStore.addProduct("flour");
console.log(myStore.listProducts());

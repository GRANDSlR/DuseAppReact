
// function calculateDistance(lat1, lon1, lat2, lon2) {
//     const earthRadius = 6371; // Радиус Земли в километрах

//     console.log(lat1 );
//     console.log(lon2);
//     console.log(lat2);
//     console.log(lon2);
  
//     // Переводим координаты из градусов в радианы
//     const lat1Rad = toRadians(lat1);
//     const lon1Rad = toRadians(lon1);
//     const lat2Rad = toRadians(lat2);
//     const lon2Rad = toRadians(lon2);
  
//     // Вычисляем разницу между координатами
//     const latDiff = lat2Rad - lat1Rad;
//     const lonDiff = lon2Rad - lon1Rad;
  
//     // Вычисляем расстояние с использованием формулы гаверсинуса
//     const a =
//       Math.sin(latDiff / 2) ** 2 +
//       Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = earthRadius * c;
  
//     return (distance / 1000).toFixed(2);
//   }
  
// function toRadians(degrees) {
// return degrees * (Math.PI / 180);
// }


function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Радиус Земли в километрах
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2);
}


export default calculateDistance;
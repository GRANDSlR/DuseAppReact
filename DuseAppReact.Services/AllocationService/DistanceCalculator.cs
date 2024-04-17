namespace DuseAppReact.Services.AllocationService
{
    internal class DistanceCalculator
    {
        private const int EARTH_RADIUS = 6372795;

        public static double CalculateTheDistance(double φA, double λA, double φB, double λB)
        {

            // перевести координаты в радианы
            double lat1 = φA * Math.PI / 180;
            double lat2 = φB * Math.PI / 180;
            double long1 = λA * Math.PI / 180;
            double long2 = λB * Math.PI / 180;

            // косинусы и синусы широт и разницы долгот
            double cl1 = Math.Cos(lat1);
            double cl2 = Math.Cos(lat2);
            double sl1 = Math.Sin(lat1);
            double sl2 = Math.Sin(lat2);
            double delta = long2 - long1;
            double cdelta = Math.Cos(delta);
            double sdelta = Math.Sin(delta);

            // вычисления длины большого круга
            double y = Math.Sqrt(Math.Pow(cl2 * sdelta, 2) + Math.Pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
            double x = sl1 * sl2 + cl1 * cl2 * cdelta;

            double ad = Math.Atan2(y, x);
            double dist = ad * EARTH_RADIUS;

            return Math.Round(dist / 1000, 3);
            //return dist;

        }
    }
}

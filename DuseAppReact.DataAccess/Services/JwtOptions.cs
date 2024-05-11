using System.Globalization;

namespace DuseAppReact.Application.Services
{
    public class JwtOptions
    {
        public string SecretKey { get; set; } = string.Empty;
        public int ExpitesHour { get; set; }
    }
}
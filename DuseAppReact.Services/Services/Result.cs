namespace DuseAppReact.Services.Services
{
    public class Result<T>
    {
        public bool IsSuccess { get; }
        public T Value { get; }
        public string ErrorMessage { get; }

        private Result(bool isSuccess, T value, string errorMessage)
        {
            IsSuccess = isSuccess;
            Value = value;
            ErrorMessage = errorMessage;
        }

        public static Result<T> Success(T value)
        {
            return new Result<T>(true, value, null);
        }

        public static Result<T> Failure(string errorMessage)
        {
            return new Result<T>(false, default, errorMessage);
        }

        public static Result<List<T>> ResultListInit<T>(List<Result<T>> speсialtyList)
        {
            List<string> failureSpeсialtyList = speсialtyList
                .Where(a => a.IsSuccess == false)
                .Select(a => a.ErrorMessage)
                .ToList();

            if (failureSpeсialtyList.Count > 0)
            {
                string errorMessageFromSpecialtyList = "";

                foreach (string errorMessage in failureSpeсialtyList)
                    errorMessageFromSpecialtyList += errorMessage + "\n";

                return Result<List<T>>.Failure(errorMessageFromSpecialtyList);
            }

            List<T> successSpeсialtyList = speсialtyList
                .Where(a => a.IsSuccess)
                .Select(a => a.Value)
                .ToList();

            return Result<List<T>>.Success(
                successSpeсialtyList
            );
        }
    }

}

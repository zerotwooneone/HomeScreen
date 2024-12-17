using R3;

namespace HomeScreen.Server.Screen;

public class TimeProvider : ITimeProvider
{
    public System.TimeProvider GetDefault()
    {
        return ObservableSystem.DefaultTimeProvider;
    }
}
namespace HomeScreen.Server.Screen;

public interface IScreenService
{
    Task SetImage(string url, CancellationToken cancellationToken=default);
}
namespace HomeScreen.Server.Screen;

public interface IScreenService
{
    Task SetImageUrl(string url, CancellationToken cancellationToken=default);
    Task SetSlideshow(string[] urls, CancellationToken cancellationToken=default);
}
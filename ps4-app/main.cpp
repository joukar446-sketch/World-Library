#include <orbis/libkernel.h>
#include "_common/graphics.h"
#include "_common/log.h"

std::stringstream debugLogStream;

#define WIDTH 1920
#define HEIGHT 1080
#define DEPTH 4

int main()
{
    setvbuf(stdout, NULL, _IONBF, 0);

    Scene2D scene(WIDTH, HEIGHT, DEPTH);

    if (!scene.Init(0xC000000, 2))
        for (;;) {}

    scene.FrameBufferFill({18, 18, 24});

    // Game cards
    Color card = {45, 45, 55};

    for (int i = 0; i < 6; i++)
    {
        int x = 80 + i * 300;
        scene.DrawRectangle(x, 250, 260, 380, card);
    }

    int frameID = 0;

    for (;;)
    {
        scene.SubmitFlip(frameID);
        scene.FrameWait(frameID);
        scene.FrameBufferSwap();
        frameID++;
    }

    return 0;
}

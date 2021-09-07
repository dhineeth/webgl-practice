interface IRenderLoop {
  start?: () => void;
  run?: () => void;
}
class RenderLoop implements IRenderLoop {}

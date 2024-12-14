import * as fabric from 'fabric';
import { useRef, useEffect, useState, useContext } from 'react';
import { Button } from "@nextui-org/button";
import { SocketIoContext } from '../SocketContext';
import { Socket } from 'socket.io-client';
import { SaveCanvasFile } from '../operations/APIfunctions/FilesOperation';

type Props = {
  FileId: string
}
// * Coment
type CursorPosition = {
  x: number,
  y: number
} | null

declare module 'fabric' {
  interface FabricObject {
    id?: string;
  }
}

function ContentPage({ FileId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Reference to the canvas DOM element
  const [fabricCanvasRef, setFabricCanvasRef] = useState<fabric.Canvas | null>(null);
  const socket = useContext(SocketIoContext);

  // Sending Move Event to Socket
  function sendObjectMovingEventToSocket(socket: Socket, event: any) {
    if (event) {
      socket.emit('object:moving', {
        FileId: FileId,
        event: {
          x: event.target.left,
          y: event.target.top
        },
        objectId: event.target.id
      });
    }
  }

  function updateCanvasWithCursorMovement(event: { x: number, y: number, objectId: string }) {
    const object = fabricCanvasRef?.getObjects().find((obj) => obj.id === event.objectId);
    if (object) {
      object.set({ left: event.x, top: event.y });
      object.setCoords(); // Ensure the object's coordinates are updated
      fabricCanvasRef?.renderAll(); // Re-render the canvas after updating the object position
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const parentElement = canvasRef.current.parentElement?.parentElement;
      if (parentElement) {
        // Initializing the Fabric Component as it is null when component mounts
        const initCanvas = new fabric.Canvas(canvasRef.current, {
          width: 600,
          height: 600,
        });

        initCanvas.backgroundColor = "white";
        initCanvas.renderAll();

        setFabricCanvasRef(initCanvas);

        initCanvas.on('object:moving', (event) => {
          console.log("Object Moving Event", event);
          if (socket) {
            sendObjectMovingEventToSocket(socket, event);
          }
        });

        return () => {
          initCanvas.dispose();
        };
      }
    }
  }, []); // Only initialize once

  // For Receiving socket events
  useEffect(() => {
    if (fabricCanvasRef && socket) {
      socket.on('object:added-server', async (data) => {
        fabric.util.enlivenObjects([data.object]).then((data) => {
          data.forEach((obj: any) => {
            fabricCanvasRef?.add(obj);
          });
          fabricCanvasRef?.renderAll();
        }).catch((error) => {
          console.error('Error enlivening objects:', error);
        });
      });

      socket.on('object:moving-server', (data) => {
        updateCanvasWithCursorMovement(data.event);
      });
    }
  }, [socket, fabricCanvasRef]);

  // Add a rectangle to the canvas
  const addRectangle = () => {
    if (fabricCanvasRef) {
      const rect = new fabric.Rect({
        id: 'rect_' + Date.now(),
        top: 50,
        left: 50,
        width: 100,
        height: 100,
        fill: 'blue',
      });
      fabricCanvasRef.add(rect);
      socket?.emit('object-added', {
        FileId: FileId,
        object: rect.toObject()
      });
    }
  };

  // Add a Circle to the canvas
  const addCircle = () => {
    // if (fabricCanvasRef) {
    //   const circle = new fabric.Circle({
    //     id: 'circle_' + Date.now(),
    //     top: 50,
    //     left: 50,
    //     radius: 50,
    //     fill: 'red',
    //   });
    //   fabricCanvasRef.add(circle);
    //   socket?.emit('object-added', {
    //     FileId: FileId,
    //     object: circle.toObject()
    //   });
    // }
  }

  async function saveFile() {
    try {

      let serializedCanvas = fabricCanvasRef?.toJSON();
      const jsonObjectCanvas = JSON.stringify(serializedCanvas);
      console.log(jsonObjectCanvas);
      const result = await SaveCanvasFile(jsonObjectCanvas, FileId)
      console.log("Result =>", result);
    } catch (err) {
      console.log("Error", err);

    }
  }

  return (
    <div className="App">
      <div className='flex gap-6'>
        <Button color="primary" onPress={addRectangle} className='mb-2'>Add Rectangle</Button>
        <Button color="primary" onPress={addCircle} className='mb-2'>Add Circle</Button>
        <Button color="secondary" onPress={saveFile} className='mb-2'>Save File</Button>

      </div>
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
}

export default ContentPage;

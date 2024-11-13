import React, { useState, useRef, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Stage, Layer, Line, Text } from 'react-konva';
import Konva from 'konva';
import { useHandleSignatureMutation } from '@@/services/user';

const tool = 'pen';
const Signature: React.FC<{ id: string }> = ({ id }) => {
  const [lines, setLines] = useState<{ tool: string; points: number[] }[]>([]);
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);

  const handleMouseDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      isDrawing.current = true;
      const pos = e?.target?.getStage()?.getPointerPosition();
      if (pos) {
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
      }
    },
    [setLines, lines],
  );

  const handleMouseMove = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (!isDrawing.current) {
        return;
      }

      const stage = e.target.getStage();
      if (stage) {
        const point = stage.getPointerPosition();
        if (point) {
          const lastLine = lines[lines.length - 1];
          lastLine.points = lastLine.points.concat([point.x, point.y]);
          lines.splice(lines.length - 1, 1, lastLine);
          setLines(lines.concat());
        }
      }
    },
    [lines, setLines],
  );

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const [handleSignature, { isSuccess }] = useHandleSignatureMutation();
  const handleExport = useCallback(async () => {
    if (stageRef.current) {
      const blob = (await stageRef.current.toBlob()) as Blob;
      handleSignature({ blob, id });
    }
  }, [handleSignature, id]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Votre signature est prise en compte`, {
        position: 'top-right',
      });
    }
  }, [isSuccess]);

  return (
    <div>
      <Stage
        className="mt-2 w-[300px] h-[200px] border border-gray-200"
        ref={stageRef}
        width={300}
        height={200}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {!lines?.length && (
            <Text
              fontSize={20}
              text="Dessinez votre signature ici"
              width={300}
              y={90}
              wrap="char"
              align="center"
            />
          )}
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#22d3ee"
              strokeWidth={3}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
      {!!lines?.length && (
        <button
          type="button"
          onClick={handleExport}
          className="my-2 bg-cyan-400 rounded-lg p-2"
        >
          <span className="text-white ml-1">Valider votre signature</span>
        </button>
      )}
    </div>
  );
};

export default Signature;

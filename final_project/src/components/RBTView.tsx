import Tree from 'react-d3-tree';

interface Props {
  root: any;
}

function convert(node: any): any {
  if (!node) return null;

  return {
    name: `${node.data.name} $${node.data.price}`,

    attributes: {
      color: node.color,
    },

    children: [
      convert(node.left),
      convert(node.right),
    ].filter(Boolean),
  };
}


function RBTreeView({ root }: Props) {
  const data = convert(root);

  if (!data) {
    return <div>No tree data</div>;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '600px',
        background: '#f5f5f5',
      }}
    >
      <Tree
      data={data}
      orientation="vertical"
      translate={{ x: 400, y: 80 }}
      pathFunc="step"
      separation={{ siblings: 1.5, nonSiblings: 2 }}

      renderCustomNodeElement={({ nodeDatum }) => (
        <g>
          <circle
            r={22}
            fill={
              nodeDatum.attributes?.color === 'RED'
                ? '#d62828'
                : '#000000'
            }
            stroke="white"
            strokeWidth={2}
          />

          <text
            fill="black"
            strokeWidth="0.5"
            x="40"
            dy=".31em"
            fontSize="20"
            fontWeight="bold"
          >
            {nodeDatum.name}
          </text>
        </g>
      )}
    />
    </div>
  );
}

export default RBTreeView;
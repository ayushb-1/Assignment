import React, {useEffect, useCallback} from 'react';
import ReactFlow, {
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    MiniMap
} from 'react-flow-renderer';
import {getUsers, updateUser} from '../services/userServices';
import CustomNode from './CustomNode';
import HobbyNode from './HobbyNode';

const nodeTypes = {
    custom: CustomNode,
    hobby: HobbyNode,
};

const UserFlow: React.FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);


    const handleDropHobby = useCallback(async (hobby: string, userId: string) => {
        try {
            setNodes(currentNodes => {
                // Find the user node using current nodes state
                const userNode = currentNodes.find(node => node.id === userId && node.type === 'custom');
                
                if (!userNode) {
                    console.error('User node not found:', userId);
                    return currentNodes;
                }

                const hobbyNodeId = `${userId}-hobby-${hobby}`;
                
                // Check if hobby node already exists for this user
                if (currentNodes.some(node => node.id === hobbyNodeId)) {
                    console.log('Hobby already exists for this user');
                    return currentNodes;
                }

                // Create hobby node with position relative to user node
                const hobbyNode = {
                    id: hobbyNodeId,
                    position: {
                        x: userNode.position.x + 200,
                        y: userNode.position.y + Math.random() * 100 - 50
                    },
                    data: { label: hobby },
                    type: 'hobby',
                };

                // Update user's hobbies
                const updatedHobbies = [...(userNode.data.hobbies || []), hobby];

                // Update the user node and add the new hobby node
                const updatedNodes = currentNodes.map(node => 
                    node.id === userId 
                        ? { ...node, data: { ...node.data, hobbies: updatedHobbies } }
                        : node
                );

                // Update backend
                updateUser(userId, { hobbies: updatedHobbies })
                    .catch(error => console.error('Error updating user:', error));

                return [...updatedNodes, hobbyNode];
            });

            // Add the new edge in a separate state update
            setEdges(currentEdges => {
                const hobbyNodeId = `${userId}-hobby-${hobby}`;
                const newEdge = {
                    id: `${userId}-to-${hobbyNodeId}`,
                    source: userId,
                    target: hobbyNodeId,
                };
                return [...currentEdges, newEdge];
            });

        } catch (error) {
            console.error('Error in handleDropHobby:', error);
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            const users = response.data
            console.log(users);
            const userNodes = users.map((user: any) => ({
                id: user._id,
                position: { x: Math.random()*400, y: Math.random()*400},
                data: {
                    label: `${user.username} (Age: ${user.age})`,
                    hobbies: user.hobbies || [],
                    onDrop: handleDropHobby,
                    userId: user._id,
                },
                type: 'custom',
            }));

            // Create hobby nodes and edges for existing hobbies
            let hobbyNodes: any[] = [];
            let hobbyEdges: any[] = [];

            users.forEach((user: any) => {
                (user.hobbies || []).forEach((hobby: string) => {
                    const hobbyNodeId = `${user._id}-hobby-${hobby}`;
                    hobbyNodes.push({
                        id: hobbyNodeId,
                        position: { 
                            x: Math.random() * 400 + 200, // Offset from user node
                            y: Math.random() * 400
                        },
                        data: { label: hobby },
                        type: 'hobby',
                    });
                    
                    hobbyEdges.push({
                        id: `${user._id}-to-${hobbyNodeId}`,
                        source: user._id,
                        target: hobbyNodeId,
                    });
                });
            });

            setNodes([...userNodes, ...hobbyNodes]);
            setEdges(hobbyEdges);
        } catch (error) {
            console.error('Error fetching users: ', error);
        }
    };

    useEffect(()=>{
        fetchUsers();
    },[]);



    const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    return (
        <div style={{width: '100%', height: '100vh'}}>
            <ReactFlow
                nodes = {nodes}
                edges = {edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <MiniMap/>
                <Controls/>
                <Background/>

            </ReactFlow>
        </div>
    )
}

export default UserFlow;
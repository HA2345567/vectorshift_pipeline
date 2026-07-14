# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Enable CORS to allow cross-origin requests from the React frontend development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins in development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all HTTP headers
)

# Define request schemas matching ReactFlow node & edge representations
class NodeSchema(BaseModel):
    id: str
    type: str = None
    data: Dict[str, Any] = None

class EdgeSchema(BaseModel):
    id: str
    source: str
    target: str

class PipelinePayload(BaseModel):
    nodes: List[NodeSchema]
    edges: List[EdgeSchema]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    nodes = payload.nodes
    edges = payload.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # 1. Construct adjacency list
    adj = {node.id: [] for node in nodes}
    
    # Ensure any referenced nodes in edges exist in the adjacency list to prevent KeyErrors
    for edge in edges:
        if edge.source not in adj:
            adj[edge.source] = []
        if edge.target not in adj:
            adj[edge.target] = []
        adj[edge.source].append(edge.target)
        
    # 2. Cycle detection using Depth-First Search (DFS)
    # States: 0 = Unvisited, 1 = Visiting (in current path recursion), 2 = Fully Visited
    visited = {node_id: 0 for node_id in adj}
    
    def has_cycle(u: str) -> bool:
        visited[u] = 1  # mark as visiting
        for v in adj[u]:
            if visited[v] == 1:
                return True  # Found a back-edge to a node in the current path (cycle!)
            if visited[v] == 0:
                if has_cycle(v):
                    return True
        visited[u] = 2  # fully visited
        return False
        
    is_dag = True
    for node_id in adj:
        if visited[node_id] == 0:
            if has_cycle(node_id):
                is_dag = False
                break
                
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

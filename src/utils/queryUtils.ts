import { LoadError, Network } from "../types";
import { multinetApi } from "multinet";

export async function subsetNetwork(
  workspaceName: string,
  subsetAmount: number,
  nodeTableNames: string[],
  edgeTableName: string,
  loadError: LoadError,
  setLoadError: (a: LoadError) => void,
  networkName: string,
  api: ReturnType<typeof multinetApi>
) {
  const aqlQuery = `let nodes = (FOR n in [${nodeTableNames}][**] LIMIT ${subsetAmount} RETURN n) let edges = (FOR e in ${edgeTableName} filter e._from in nodes[**]._id && e._to in nodes[**]._id RETURN e)
      RETURN {"nodes": nodes[**], edges}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let newAQLNetwork: Network = { nodes: [], edges: []};

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newAQLNetwork = (await api.aql(workspaceName, { query: aqlQuery, bind_vars: {} }) as Network[])[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status === 400) {
      setLoadError({
        message: error.statusText,
        href: 'https://multinet.app',
      });
    } else {
      setLoadError({
        message: 'An unexpected error ocurred',
        href: 'https://multinet.app',
      });
    }
  } finally {
    if (loadError.message === 'The network you are loading is too large' && typeof newAQLNetwork === 'undefined') {
      // Catches CORS errors, issues when DB/API are down, etc.
      setLoadError({
        message: 'There was a network issue when getting data',
        href: `./?workspace=${workspaceName}&network=${networkName}`,
      });
    }
  }

  return newAQLNetwork;
}
interface UrlState {
	data: any[];
	loading: boolean;
	error: string | null;
	urlCreated: boolean;
  }
  
  const initialState: UrlState = {
	data: [],
	loading: false,
	error: null,
	urlCreated: false,
  };
  
  const updateData = (data: any[], updatedItem: any) =>
	data.map((item) => (item.id === updatedItem.id ? updatedItem : item));
  
  const urlReducer = (state = initialState, action: any): UrlState => {
	switch (action.type) {
	  case "FETCH_START":
		return { ...state, loading: true, error: null };
  
	  case "FETCH_SUCCESS":
		return { ...state, loading: false, data: action.payload };
  
	  case "FETCH_ERROR":
	  case "CREATE_URL_ERROR":
	  case "UPDATE_URL_ERROR":
	  case "DELETE_ERROR":
		return { ...state, loading: false, error: action.payload || "An error occurred" };
  
	  case "DELETE_SUCCESS":
		return {
		  ...state,
		  data: state.data.filter((url) => url.id !== action.payload),
		};
  
	  case "CREATE_URL_SUCCESS":
		return {
		  ...state,
		  urlCreated: true,
		  data: [...state.data, action.payload],
		};
  
	  case "UPDATE_URL_SUCCESS":
		return {
		  ...state,
		  urlCreated: true,
		  data: updateData(state.data, action.payload),
		};
  
	  case "RESET_URL_CREATED":
		return { ...state, urlCreated: false };
  
	  default:
		return state;
	}
  };
  
  export default urlReducer;
  
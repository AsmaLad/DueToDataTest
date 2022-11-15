// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from './actions/appApi';

export default function Index () {
  // Redux Props:
  const dispatch = useDispatch();

  // State:
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getMovies(setLoading));
  }, []);
  
  return (
    <View style={styles.container}>
      {loading ? <Text>LOADING ...</Text> : <Text>Hello</Text>}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


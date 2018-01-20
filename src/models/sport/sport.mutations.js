import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import SportType from './sport.type';
import Sport, { removeSport } from './sport.schema';

export default {
  addSport: {
    type: SportType,
    args: {
      name: {
        name: 'name',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, { name }) => {
      const newSport = new Sport({ name: name });

      return new Promise((resolve, reject) => {
        newSport.save((err, res) => {
          err ? reject(err): resolve(res);
        });
      });
    }
  },
  removeSport: {
    type: SportType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: removeSport
  }
};
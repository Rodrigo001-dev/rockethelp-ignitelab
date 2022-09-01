// DTO => Data Transform Object
// esse arquivo serve para separar a tipagem daquilo que o firestore vai me entregar
// tudo aquilo que vai ser transferido to firestore para a minha aplicação

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type OrderFirestoreDTO = {
  patrimony: string;
  description: string;
  status: 'open' | 'closed',
  // solution vai ser opsional porque quando a solicitação está aberta não tem
  // uma solução ainda
  solution?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at?: FirebaseFirestoreTypes.Timestamp;
};
import { Db } from './index'
import { DocumentReference } from './document'
import { Query } from './query'
import Aggregation from './aggregate'
import { CreateIndexRes, DropIndexRes, ListIndexesRes } from './result-types'


/**
 * 集合模块，继承 Query 模块
 *
 */
export class CollectionReference extends Query {
  /**
   * 初始化
   *
   * @internal
   *
   * @param db    - 数据库的引用
   * @param coll  - 集合名称
   */
  constructor(db: Db, coll: string) {
    super(db, coll)
  }

  /**
   * 读取集合名字
   */
  get name() {
    return this._coll
  }

  /**
   * 获取文档的引用
   *
   * @param docID - 文档 ID
   */
  doc(docID: string | number): DocumentReference {
    if (!docID) {
      throw new Error('docID cannot be empty')
    }
    return new DocumentReference(this._db, this._coll, docID)
  }

  /**
   * 添加一篇文档
   *
   * @param data - 数据
   */
  add(data: Object, options?: { multi: boolean }) {
    let docRef = new DocumentReference(this._db, this._coll, undefined)
    return docRef.create(data, options)
  }

  aggregate(rawPipeline: object[] = []) {
    return new Aggregation(this._db, this._coll, rawPipeline)
  }

  /**
   * 创建索引
   */
  public async createIndex(keys: Record<string, number | string>, options?: any): Promise<CreateIndexRes> {
    let docRef = new DocumentReference(this._db, this._coll, undefined)
    return docRef.createIndex(keys, options)
  }

  /**
   * 删除索引
   */
  public async dropIndex(index: string | Record<string, number | string>): Promise<DropIndexRes> {
    let docRef = new DocumentReference(this._db, this._coll, undefined)
    return docRef.dropIndex(index)
  }

  public async listIndexes(): Promise<ListIndexesRes> {
    let docRef = new DocumentReference(this._db, this._coll, undefined)
    return docRef.listIndexes()
  }
}

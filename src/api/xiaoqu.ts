/**
 * 岗位管理模块
 *
 */

import { axios } from '@/utils/request';
import { ResponseSuccess } from '@/entities/common';

export function getXiaoQubList(parameter){
  return axios({
    url: '/xiaoqu',
    method: 'get',
    params: parameter
  });
}

export function store(parameter){
  return axios({
    url: '/xiaoqu',
    method: 'post',
    data: parameter
  });
}

export function read(id){
  return axios({
    url: '/xiaoqu/' + id,
    method: 'get'
  });
}

export function update(id, parameter): Promise<ResponseSuccess<boolean>>{
  return axios({
    url: '/xiaoqu/' + id,
    method: 'put',
    data: parameter
  }) as any;
}

export function del(id){
  return axios({
    url: '/xiaoqu/' + id,
    method: 'delete'
  });
}

export function getAllXiaoQu(): Promise<ResponseSuccess<any>>{
  return axios({
    url: '/xiaoqu/all',
    method: 'get'
  }) as any;
}